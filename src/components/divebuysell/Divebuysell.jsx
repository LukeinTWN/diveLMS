import React, { useEffect, useState, useContext } from 'react';
import { auth, db } from "../../firebase";
import {
  collection,
  doc,
  serverTimestamp,
  addDoc,
  setDoc,
  updateDoc,
  getDoc
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Divebuysell = () => {
  
  const [price, setPrice] = useState(0);
  const { cash, stockCount, sum,data, currentUser, dispatch } = useContext(AuthContext);

  // Get the price from the "divedata" collection in Firestore, under the document "test1"
  // Replace "test1" with the actual document ID from which you want to fetch the price
  const getDiveDataPrice = async () => {
    try {
      const docRef = doc(db, "divedata", "test1");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const price = docSnap.data().price;
        // Update the price state with the fetched price from Firestore
        setPrice(price);
      }
    } catch (error) {
      console.error("Error fetching price from Firestore:", error);
    }
  };

  useEffect(() => {
    const diveLinker = new window.DiveLinker("dive");

    window.onload = function () {
      diveLinker.enableBlock(false);
      diveLinker.start();
    };

    const intervalId = setInterval(() => {
      //diveLinker.setInput("bb0e9fbe333e40918458aecc75a5e459", price);
      console.log(diveLinker.getIOList())
      diveLinker.setInput("656c35b5aaf847509972a800abf85c12", cash);
      diveLinker.setInput("3e70dbd10d7f401ab0f814be51379634", stockCount);
      diveLinker.setInput("d93f744f43934278816c1633d42f0e5b", sum);
      
      if (diveLinker.getAttr("7845b78ca8b246f383e353bc386572db") === 1) {
        const stockcount = diveLinker.getAttr("3e70dbd10d7f401ab0f814be51379634");
        const money = diveLinker.getAttr("656c35b5aaf847509972a800abf85c12");
        const tot = diveLinker.getAttr("d93f744f43934278816c1633d42f0e5b");
        console.log(stockcount, money, tot);
        // Store the values in Firebase
        if (stockcount && money && tot) {
          addDataToFirebase(tot);
          setDataToFirebase(stockcount, money, tot);
          diveLinker.setInput("7845b78ca8b246f383e353bc386572db", 0);

          // Dispatch after setInput
          dispatch({
            type: "UPDATE_USER",
            payload: {
              stockCount: stockcount,
              cash: money,
              sum: tot,
            },
          });
        }
      }

      if (diveLinker.getAttr("fd3bfb65a5874ef1a249d57de7debaea") === 1) {
        const stockcount = diveLinker.getAttr("3e70dbd10d7f401ab0f814be51379634");
        const money = diveLinker.getAttr("656c35b5aaf847509972a800abf85c12");
        const tot = diveLinker.getAttr("d93f744f43934278816c1633d42f0e5b");
        console.log(stockcount, money, tot);
        // Store the values in Firebase
        if (money && tot) {
          addDataToFirebase(tot);
          setDataToFirebase(stockcount, money, tot);
          diveLinker.setInput("fd3bfb65a5874ef1a249d57de7debaea", 0);

          // Dispatch after setInput
          dispatch({
            type: "UPDATE_USER",
            payload: {
              stockCount: stockcount,
              cash: money,
              sum: tot,
            },
          });
        }
      }
      console.log("update stockCount cash")
      console.log(stockCount, cash, sum);
      if (diveLinker.checkComplete()) {
        diveLinker.setProject("6192");
      }
    }, 1000);

    getDiveDataPrice(); // Fetch price from Firestore

    return () => {
      clearInterval(intervalId);
    };
  }, [price, sum, stockCount, cash, data,currentUser, dispatch]);

  const addDataToFirebase = async (sum) => {
    try {
      const date = new Date();
      const time = date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
  
      const newData = {
        name: time,
        Total: sum,
      };
  
      const dataRef = doc(db, 'users', currentUser.uid);
      const dataSnap = await getDoc(dataRef);
      let data = [];
      if (dataSnap.exists()) {
        data = dataSnap.data().data || [];
      }
  
      data.push(newData);
  
      console.log('Data to be added:', data);
  
      await updateDoc(dataRef, { data });
  
      // Dispatch after updating data in Firestore
      dispatch({ type: 'UPDATE_DATA', payload: data });
  
      console.log('Data updated successfully:', data);
    } catch (error) {
      console.error('Error adding data to Firebase:', error);
    }
  };
  
  
  

  const setDataToFirebase = async (stockcount, money, tot) => {
    try {
      // Update the data in Firebase
      const docRef = doc(db, 'users', currentUser.uid);
      await updateDoc(docRef, {
        stockCount: stockcount,
        cash: money,
        sum: tot,
      });
    } catch (error) {
      console.error("Error updating data in Firebase:", error);
    }
  };

  return (
    <div>
      <iframe
        id="iframe_"
        src="https://dive.nutn.edu.tw/Experiment/kaleTestExperiment5.jsp?eid=26970&record=false"
        name="dive"
        width="1024"
        height="768"
      ></iframe>
    </div>
  );
};

export default Divebuysell;



/* const fetchData = async () => {
  try {
    const response = await fetch("https://www.twse.com.tw/exchangeReport/STOCK_DAY_ALL?response=open_dat");
    const jsonData = await response.json();
    setData(jsonData);
    setPrice(parseFloat(jsonData.data[1][7])); // Set the price after data is fetched
  } catch (error) {
    console.error(error);
  }
}; */
/* const name0 = diveLinker.getAttr("900a886748024b8783f08b93ad2d64e9");  // 盤中1盤後0
      const name1 = diveLinker.getAttr("8c8dcde728c34890b126bf2c0b283fcb");  // 現沖資券 (Margin Securities for Current Offset)
      const name2 = diveLinker.getAttr("cc3f0fce500d48cd9fd6273580c989ae");  // 限市漲跌平 (Limit Market Rise and Fall Flat)
      const name3 = diveLinker.getAttr("dd52bb4244254d2a922bac741942d4b1");  // 現股0零股1 (Regular Shares 0, Odd Shares 1)
      const name4 = diveLinker.getAttr("3f909cb949c344eaba9a9b809fabe57b");  // 數量 (Quantity)
      const name5 = diveLinker.getAttr("d24984a61e1246409f313fbdcf0de67f");  // 買進 (Buy)
      const name6 = diveLinker.getAttr("4690dd79b9914ad180fd2121b9c8a40b");  // 賣出 (Sell)
      const name7 = diveLinker.getAttr("42261ae1dc5b41ddbd527717a16dc1ef");  // 股價 (Stock Price)
      const stockcount = diveLinker.getAttr("cd7bf4bc7c644a5a96938f5b2c6a8f1d");  // 庫存 (Inventory)
      const tot = diveLinker.getAttr("938b0c3025ab41ba85f917140c319890");  // 總值 (Total Value)
      const money = diveLinker.getAttr("50d5b837533447369f8a7f6199c0439c"); // cash */