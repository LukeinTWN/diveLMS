import React, { useEffect, useContext, useState } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { getDoc, setDoc, collection } from "firebase/firestore";

const Divecourse = () => {
  const { cash, currentUser, progress, dispatch } = useContext(AuthContext);
  const [a ,setA] =useState(0);
  const fetchProgress = async () => {
    const userDocRef = doc(collection(db, "users"), currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      setA(userData.progress);
      console.log(userData.progress,"sus",a)
      
    }
  };
  
  useEffect(() => {
    fetchProgress();
    const diveLinker = new window.DiveLinker("dive");

    window.onload = function () {
      diveLinker.enableBlock(false);
      diveLinker.start();
    };
    
    const intervalId = setInterval(() => {
      
      
      const pr = diveLinker.getAttr("6f0c3e3538a8442aabb6be0f794fa123");
      const sc = diveLinker.getAttr("55b09212c56b4e648cddb3664a00510f");
      console.log(pr,sc, a);
      if (pr > a) {
        console.log(progress, cash, "hi");
        // Update the progress in Firestore user collection
        setDataToFirebase(pr);
           
          
      }
      if(sc ==1){
        setScoreToFirebase(sc*100);
      }

      if (diveLinker.checkComplete()) {
        diveLinker.setProject("6192");
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentUser,a]);

  const setDataToFirebase = async (progress) => {
    try {
      // Update the data in Firebase
      const docRef = doc(db, 'users', currentUser.uid);
      await updateDoc(docRef, {
        progress:progress,
      });
    } catch (error) {
      console.error("Error updating data in Firebase:", error);
    }
  };
  const setScoreToFirebase = async (score) => {
    try {
      // Update the data in Firebase
      const docRef = doc(db, 'users', currentUser.uid);
      await updateDoc(docRef, {
        score:score,
      });
    } catch (error) {
      console.error("Error updating data in Firebase:", error);
    }
  };
  return (
    <div>
      <iframe
        id="iframe_"
        src="https://dive.nutn.edu.tw/Experiment/kaleTestExperiment5.jsp?eid=28123&record=false"
        name="dive"
        width="1024"
        height="768"
      ></iframe>
    </div>
  );
};

export default Divecourse;




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