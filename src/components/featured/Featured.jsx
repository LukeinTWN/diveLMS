import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { AuthContext } from "../../context/AuthContext";
import { getDoc, setDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useContext, useState ,useEffect} from "react";
const Featured = () => {
  const { currentUser } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);
  const [sum, setSum] = useState(0)
  const [stockCount, setStockcount] =useState(0);
  const [cash, setCash] = useState(0);
  const [score, setScore] = useState(0)

  useEffect(() => {
    const fetchProgress = async () => {
      const userDocRef = doc(collection(db, "users"), currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setProgress(userData.progress);
        setSum(userData.sum);
        setCash(userData.cash);
        setStockcount(userData.stockCount);
        setScore(userData.score);
      }
    };

    fetchProgress();
  }, [currentUser]);
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">學習進度</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={progress/8*100} text={`${Math.floor((progress / 8) * 100)}%`} strokeWidth={10} />
        </div>
        <p className="title">總價值</p>
        <p className="amount">${sum}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">現金</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">${cash}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">庫存</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">${stockCount}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">分數</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{score}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
