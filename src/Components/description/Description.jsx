import { useState } from "react";
import style from "./description.module.css";
import { CgMenuLeftAlt } from "react-icons/cg";
import { TfiAnnouncement } from "react-icons/tfi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "react-quill/dist/quill.snow.css";
import { useRecoilState } from "recoil";
import CardItem, { taskDetails } from "../../recoil/atoms/Atoms";

const Description = () => {
  const [cardID, setCardID] = useRecoilState(taskDetails);
  const [showaddDescriptionBox, setShowaddDescriptionBox] = useState(false);
  const [value, setValue] = useState("");
  const [cardArr, setcardArr] = useRecoilState(CardItem);
  const mainIndex = cardArr.findIndex((ele) => ele.id === cardID.mainId);
  const taskArr = [...cardArr[mainIndex].task];
  const index = taskArr.findIndex((ele) => ele.id === cardID.id);

  function handleShowAddDescriptionBox() {
    setShowaddDescriptionBox(!showaddDescriptionBox);
  }

  const addDiscription = () => {
    if (!value) {
      return;
    }

    const mainIndex = cardArr.findIndex((ele) => ele.id === cardID.mainId);
    const taskArr = [...cardArr[mainIndex].task];
    const index = taskArr.findIndex((ele) => ele.id === cardID.id);
    const taskobj = taskArr[index];
    const newObj = { ...taskobj, description: value };
    const newtskarr = taskArr.map((ele) => {
      if (ele.id === cardID.id) {
        return newObj;
      }
      return ele;
    });

 
    const newMainArr = cardArr.map((ele) => {
      if (ele.id == cardID.mainId) {
        return {
          ...ele,task:newtskarr
        };
      }
      return ele;
    });    
    setcardArr(newMainArr);
    localStorage.setItem('data',JSON.stringify(newMainArr));

    setShowaddDescriptionBox(false)
  };

  return (
    <div className={style.descriptionConatiner}>
      <div className={style.header}>
        <CgMenuLeftAlt />
        <h3>Description</h3>
        {showaddDescriptionBox && (
          <p>
            <AiOutlineInfoCircle />
          </p>
        )}
      </div>

      <div className={style.content}>
        {showaddDescriptionBox ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <textarea
                placeholder="Enter disription here..."
                style={{ paddingTop: "0.5rem", paddingLeft: "1rem" }}
                id=""
                cols="68"
                rows="4"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <div className={style.bottomSection}>
              <div className={style.btnContainer}>
                <button className={style.saveBtn} onClick={addDiscription}>
                  Save
                </button>
                <button
                  className={style.cancelBtn}
                  onClick={handleShowAddDescriptionBox}
                >
                  Cancel
                </button>
              </div>

              <span>
                <TfiAnnouncement color="blue" />
                <p>Share Feedback</p>
              </span>
            </div>
          </div>
        ) : (
          <div
            className={style.editorBox}
            onClick={handleShowAddDescriptionBox}
          >
            Add a more detailed description
          </div>
        )}
        
        
      
        
      </div>
      {
        !showaddDescriptionBox&& <p>{ cardArr[mainIndex].task[index].description}</p>

      }

    </div>
  );
};

export default Description;
