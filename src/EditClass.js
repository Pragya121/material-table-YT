import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar.js";

// import Navibar from "./Navibar";
import { app } from "./base";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import "./App.css";
import { Container } from "react-bootstrap";
import MaterialTable from "material-table";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import loading from "./Ellipsis-1s-200px.gif";
import { forwardRef } from "react";
// import mockData from "./mockData.json";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Paper from "@material-ui/core/Paper";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "@mui/material";
import { removeData } from "jquery";
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function EditClass() {
  const [query, setQuery] = useState({
    id: "",
    email: "farhan@podium.school",
  });
  const [data, setData] = useState([]);
  // const callback = useCallback((email) => {
  //   query.email = email;
  //   console.log(email);
  // }, []);

  function queryParams(params) {
    return Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
  }
  useEffect(() => {
    // setData(mockData);

    var url =
      "https://us-central1-podiumapp-15592.cloudfunctions.net/appClasses";
    // url += (url.indexOf("?") === -1 ? "?" : "&") + queryParams(query);
    url = url + "?teacherID=" + query.email;
    // url = url + "?teacherID=" + "farhan@podium.school";
    // var header = {
    //   "Content-Type": "application/json",
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    // };
    var requestOptions = {
      // header: header,
      method: "GET",

      redirect: "follow",
    };
    console.log(query, url);

    fetch(url, requestOptions)
      .then((response) => {
        console.log(response);

        return response.json();
      })
      .then((result) => {
        console.log(result);
        // let arr = [];
        // arr = result.classes;
        // setData(arr);
        setData(result);
        // for (const key in result) {
        //   arr.push(result[key]);
        // }
        // setData(arr);
      })
      .catch((error) => {
        console.log("error", error);
        alert("There is a connection error!");
      });
  }, []);

  //  Function to check if entered number is a natural number, for number of classes
  function nat(n) {
    return n >= 1 && Math.floor(n) === +n;
  }
  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }
  function removeElement(element) {
    // This function is used for removing any URL
    // delete myLeads[element.parentNode.id]; // this will get the unique id of the URL and using that unique ID it will remove it from our JS object `myLeads`
    element.parentNode.remove(); // Then simply remove that element from our HTML
    // Finally Save everything to localstorage
  }

  function weekdaysInput(props) {
    let numClasses = Number(document.getElementById("totalClasses"));

    return (
      <>
        <h7>Choose the class days</h7>
        <div
          onClick={(e) => {
            if (numClasses === "") {
              alert("Please fill number of classes first.");
              return;
            }

            let weekdays = [];
            let mon = document.getElementById("mon");
            let tues = document.getElementById("tues");
            let wed = document.getElementById("wed");
            let thurs = document.getElementById("thurs");
            let fri = document.getElementById("fri");
            let sat = document.getElementById("sat");
            let sun = document.getElementById("sun");

            let monTime = document.getElementById("monT");
            let tuesTime = document.getElementById("tuesT");
            let wedTime = document.getElementById("wedT");
            let thursTime = document.getElementById("thursT");
            let friTime = document.getElementById("friT");
            let satTime = document.getElementById("satT");
            let sunTime = document.getElementById("sunT");
            weekdays = [mon, tues, wed, thurs, fri, sat, sun];
            let weekTime = [
              monTime,
              tuesTime,
              wedTime,
              thursTime,
              friTime,
              satTime,
              sunTime,
            ];
            checkboxlimit(weekdays, numClasses);

            // if (
            //   weekdays[new Date(startDate).getDay()].checked === false
            // ) {
            //   alert(
            //     "Please select the start day" +
            //       weekdays[new Date(startDate).getDay()].value
            //   );
            // }
          }}
        >
          {" "}
          <div>
            <input
              type="checkbox"
              id="mon"
              name="mon"
              value="Monday"
              onClick={(e) => {
                let time = document.getElementById("monT");
                time.hidden = !time.hidden;
                time.required = !time.required;
              }}
            />
            <label for="mon">Monday</label>
            <input
              type="time"
              id="monT"
              name="montime"
              min="09:00"
              max="20:00"
              // onChange={getDatesValidation}
              hidden
            ></input>
          </div>
          <div>
            <input
              type="checkbox"
              id="tues"
              name="tues"
              value="Tuesday"
              onClick={(e) => {
                let time = document.getElementById("tuesT");
                time.hidden = !time.hidden;
                time.required = !time.required;
              }}
            />
            <label for="tues">Tuesday</label>
            <input
              type="time"
              id="tuesT"
              name="tuestime"
              min="09:00"
              max="20:00"
              hidden
            ></input>
          </div>
          <div>
            <input
              type="checkbox"
              id="wed"
              name="wed"
              onClick={(e) => {
                let time = document.getElementById("wedT");
                time.hidden = !time.hidden;
                time.required = !time.required;
              }}
              value="Wednesday"
            />
            <label for="wed">Wednesday</label>
            <input
              type="time"
              id="wedT"
              name="wedtime"
              min="09:00"
              max="20:00"
              hidden
            ></input>
          </div>
          <div>
            <input
              type="checkbox"
              id="thurs"
              name="thurs"
              value="Thursday"
              onClick={(e) => {
                let time = document.getElementById("thursT");
                time.hidden = !time.hidden;
                time.required = !time.required;
              }}
            />
            <label for="thurs">Thursday</label>
            <input
              type="time"
              id="thursT"
              name="thurstime"
              min="09:00"
              max="20:00"
              hidden
            ></input>
          </div>
          <div>
            <input
              type="checkbox"
              id="fri"
              name="fri"
              value="Friday"
              onClick={(e) => {
                let time = document.getElementById("friT");
                time.hidden = !time.hidden;
                time.required = !time.required;
              }}
            />
            <label for="fri">Friday</label>
            <input
              type="time"
              id="friT"
              name="fritime"
              min="09:00"
              max="20:00"
              hidden
            ></input>
          </div>
          <div>
            <input
              type="checkbox"
              id="sat"
              name="sat"
              value="Saturday"
              onClick={(e) => {
                let time = document.getElementById("satT");
                time.hidden = !time.hidden;
                time.required = !time.required;
              }}
            />
            <label for="sat">Saturday</label>
            <input
              type="time"
              id="satT"
              name="sattime"
              min="09:00"
              max="20:00"
              hidden
            ></input>
          </div>
          <div>
            <input
              type="checkbox"
              id="sun"
              name="sun"
              value="Sunday"
              onClick={(e) => {
                let time = document.getElementById("sunT");
                time.hidden = !time.hidden;
                time.required = !time.required;
              }}
            />
            <label for="sun">Sunday</label>
            <input
              type="time"
              id="sunT"
              name="suntime"
              min="09:00"
              max="20:00"
              hidden
            ></input>
          </div>
          <label className="form-control" for="classTimings">
            Classes start from
          </label>
          <input
            className="form-control"
            type="date"
            id="classStartDay"
            min={new Date().toLocaleDateString("en-ca")}
            onKeyPress={(e) => {
              e.preventDefault();
            }}
            onChange={(e) => {
              // taking input from checkboxes to form array of
              // weekdays and time, since .getDay() return 0,1,2 so in end it's translated
              //  to week days values are stored to value obj in end
              let startDate = e.target.value;
              let numClasses = Number(
                document.getElementById("totalClasses").value
              );

              let mon = document.getElementById("mon");
              let tues = document.getElementById("tues");
              let wed = document.getElementById("wed");
              let thu = document.getElementById("thurs");
              let fri = document.getElementById("fri");
              let sat = document.getElementById("sat");
              let sun = document.getElementById("sun");
              let weekdays = [sun, mon, tues, wed, thu, fri, sat];
              let monTime = document.getElementById("monT");
              let tuesTime = document.getElementById("tuesT");
              let wedTime = document.getElementById("wedT");
              let thuTime = document.getElementById("thursT");
              let friTime = document.getElementById("friT");
              let satTime = document.getElementById("satT");
              let sunTime = document.getElementById("sunT");

              let weekTime = [
                sunTime,
                monTime,
                tuesTime,
                wedTime,
                thuTime,
                friTime,
                satTime,
              ];
              let selectedWeekdays = [];
              let timeArr = [];
              weekdays.forEach((day, index) => {
                if (day.checked) {
                  selectedWeekdays.push(index);
                  if (weekTime[index].value.length != 0) {
                    timeArr.push(weekTime[index].value);
                  } else {
                    alert("Please select time for " + day.value + "!");
                    document.getElementById("classStartDay").value = "";
                  }
                }
              });

              if (!selectedWeekdays.includes(new Date(startDate).getDay())) {
                alert(
                  "Please select a different day as per weekdays selected."
                );
                document.getElementById("classStartDay").value = "";
              }

              // dates array from the selected dates and number of classes
              let i = 0;
              if (!nat(numClasses)) {
                // checking if number of classes is natural number and not empty
                alert("Please enter number of classes.");
                document.getElementById("classStartDay").value = "";
              }
              let loopdate = startDate;
              let scheduledDates = [];
              while (i < numClasses) {
                if (selectedWeekdays.includes(new Date(loopdate).getDay())) {
                  let index = selectedWeekdays.findIndex(
                    (x) => x === new Date(loopdate).getDay()
                  );
                  let isoDate = new Date(
                    loopdate + " " + timeArr[index]
                  ).toISOString();
                  scheduledDates.push(isoDate);
                  i++;
                }
                loopdate = addDays(loopdate, 1);
              }
              // console.log(selectedWeekdays);
              // console.log(timeArr);
              // console.log(scheduledDates);
              let arrWeek = {
                1: "Mon",
                0: "Sun",
                2: "Tues",
                3: "Wed",
                4: "Thu",
                5: "Fri",
                6: "Sat",
              };

              props.rowData.scheduledDates = scheduledDates;
              props.rowData.timeArr = timeArr;
              props.rowData.daysOfWeek = selectedWeekdays.map(
                (x) => arrWeek[x]
              );
              console.log(props);
              // console.log(value.scheduledDates);
              // console.log(value.timeArr);
              // console.log(value.daysOfWeek);
            }}
          />
        </div>
      </>
    );
  }
  // find number of words
  const getWordCount = (text) => {
    var wordCount = text.match(/(\w+)/g).length;

    return wordCount;
  };
  function CheckDimension(fileIn) {
    //Get reference of File.
    var fileUpload = fileIn;

    //Check whether the file is valid Image.
    var regex = new RegExp("([a-zA-Z0-9s_\\.-:])+(.jpg|.png|.gif)$");
    if (!regex.test(fileUpload.name.toLowerCase())) {
      //Check whether HTML5 is supported.
      if (typeof fileUpload != "undefined") {
        //Initiate the FileReader object.
        var reader = new FileReader();
        //Read the contents of Image File.
        reader.readAsDataURL(fileUpload);
        reader.onload = function (e) {
          //Initiate the JavaScript Image object.
          var image = new Image();

          //Set the Base64 string return from FileReader as source.
          image.src = e.target.result;

          //Validate the File Height and Width.
          image.onload = function () {
            var height = this.height;
            var width = this.width;
            console.log(height, width);
            // if (height > 1000 || width > 1000) {
            //   //show width and height to user
            //   console.log(height, width);
            //   alert("Height and Width must not exceed 200px.");
            //   return false;
            // }
            alert("Uploaded image has valid Height and Width.");
            return true;
          };
        };
      } else {
        alert("This browser does not support HTML5.");
        return false;
      }
    } else {
      alert("Please select a valid Image file.");
      return false;
    }
  }
  //add days to a date
  const addDays = (enteredDate, days) => {
    var date = new Date(enteredDate);
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("en-ca");
  };

  //limit number of ckeckboxes to no of classes when it's <7
  function checkboxlimit(checkgroup, limit) {
    var checkgroup = checkgroup;
    var limit = limit;
    //Changes onclick funtion for each checkbox
    for (var i = 0; i < checkgroup.length; i++) {
      checkgroup[i].onclick = function () {
        var checkedcount = 0;
        //Loops through checkboxes
        for (var i = 0; i < checkgroup.length; i++) {
          //adds 1 if checked, 0 if not
          checkedcount += checkgroup[i].checked ? 1 : 0;
        }

        //Loops through checkboxes
        for (var i = 0; i < checkgroup.length; i++) {
          //Disables check box if it's unchecked and the limit has been reached
          if (!checkgroup[i].checked && checkedcount == limit) {
            checkgroup[i].disabled = true;
          }

          //Enables all checkboxes otherwise
          else {
            checkgroup[i].disabled = false;
          }
        }
      };
    }
  }
  async function uploadFileCloud(file, nameStart, newData, reject) {
    console.log("calling");

    var fileNameParts = file.name.split(".");
    var storage = getStorage(app);
    var storageRef = ref(
      storage,

      "App Classes/" +
        newData.title +
        nameStart +
        // uuidv4() +

        fileNameParts[fileNameParts.length - 1]
    );
    var metadata = {
      contentType: file.type,
    };
    try {
      var downloadURLPromise = await uploadBytes(storageRef, file, metadata);
      const link = await getDownloadURL(storageRef);
      console.log(link);
      return link;
    } catch (error) {
      console.log(error);
      alert("Sorry! update failed!");
      reject(error);
    }
  }
  const columns = [
    { title: "Class ID", field: "id", hidden: true },
    {
      title: "Class Name",
      field: "title",
      render: (rowData) => (
        <TextField
          defaultValue={rowData.title}
          style={{ width: 200 }}
          size="small"
          multiline
          InputProps={{
            readOnly: true,
          }}
        ></TextField>
      ),
      editComponent: (props) => {
        return (
          <TextField
            defaultValue={props.rowData.title}
            style={{ width: 200 }}
            size="small"
            onChange={(e) => {
              if (e.target.value.length >= 1 && e.target.value.length < 50) {
                props.onChange(e.target.value);
              } else {
                alert("Title field should be between 1 to 50 characters.");
                e.target.value = "";
              }
            }}
          ></TextField>
        );
      },
    },
    {
      title: "Class Photo",
      field: "displayImage",
      render: (rowData) => (
        <img
          style={{ height: 36, cursor: "zoom-in" }}
          alt="Image preview"
          src={rowData.displayImage}
          onClick={() => {
            window.open(
              rowData.displayImage,
              "_blank",
              "menubar=1,resizable=1"
            );
          }}
        />
      ),
      editComponent: (props) => {
        return (
          <input
            type="file"
            id="classPhoto"
            name="file"
            defaultValue={props.classPhoto}
            accept="image/*"
            required
            onChange={(e) => {
              let previousImg = props.value;
              if (e.target.files[0].size > 1000000) {
                alert("File size should not exceed 1MB");
                e.target.value = "";
                return;
              }
              // check whether selected file is image or not
              if (e.target.files[0].type.split("/")[0] != "image") {
                alert("Only image files are allowed");
                e.target.value = "";
                return;
              }
              // check the height and width ratio of the image
              let isReturn = false;
              const img = new Image();
              img.src = URL.createObjectURL(e.target.files[0]);
              img.onload = function () {
                const height = this.height;
                const width = this.width;
                if (height > width) {
                  alert("Please upload a widescreen image. Eg: 16:9 ratio");
                  e.target.value = "";
                  isReturn = true;
                  return;
                }
              };
              if (isReturn) {
                return;
              }
            }}
          />
        );
      },
      filtering: false,
    },
    {
      title: "Duration",
      field: "duration",
      render: (rowData) => <div>{rowData.duration + " minutes"}</div>,
      editComponent: (props) => {
        return (
          <select
            id="classDuration"
            onChange={(e) => {
              props.onChange(e.target.value);
            }}
            defaultValue={props.duration}
          >
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
          </select>
        );
      },
    },
    {
      title: "Mode",
      field: "mode",
      editComponent: (props) => {
        return (
          <select
            defaultValue={props.mode}
            onChange={(e) => {
              props.onChange(e.target.value);
            }}
            defaultValue={props.duration}
          >
            <option value="live">Live</option>
            <option value="recorded">Recorded</option>
          </select>
        );
      },
    },
    {
      title: "Total classes",
      field: "totalClasses",

      editComponent: (props) => {
        return (
          <input
            type="number"
            id="totalClasses"
            defaultValue={props.rowData.totalClasses}
            onChange={(e) => {
              let weekdays = [];

              let mon = document.getElementById("mon");
              let tues = document.getElementById("tues");
              let wed = document.getElementById("wed");
              let thurs = document.getElementById("thurs");
              let fri = document.getElementById("fri");
              let sat = document.getElementById("sat");
              let sun = document.getElementById("sun");

              let monTime = document.getElementById("monT");
              let tuesTime = document.getElementById("tuesT");
              let wedTime = document.getElementById("wedT");
              let thursTime = document.getElementById("thursT");
              let friTime = document.getElementById("friT");
              let satTime = document.getElementById("satT");
              let sunTime = document.getElementById("sunT");
              weekdays = [mon, tues, wed, thurs, fri, sat, sun];

              let weekTime = [
                monTime,
                tuesTime,
                wedTime,
                thursTime,
                friTime,
                satTime,
                sunTime,
              ];
              weekdays.forEach((day, index) => {
                console.log(day);
                if (day != null && day != undefined) {
                  day.checked = false;
                  weekTime[index].hidden = true;
                  weekTime[index].value = "";
                }
              });

              props.onChange(e.target.value);
            }}
          />
        );
      },
    },
    {
      title: "Type",
      field: "type",
      editComponent: (props) => {
        return (
          <select
            defaultValue={props.type}
            id="type"
            onChange={(e) => {
              let num = document.getElementById("totalClasses");
              if (num.value === "1") {
                e.target.value = "single";
              } else {
                e.target.value = "multiple";
              }
              {
                props.onChange(e.target.value);
              }
            }}
            defaultValue={props.value}
          >
            <option value="single">Single</option>
            <option value="multiple">Multiple</option>
          </select>
        );
      },
    },
    {
      title: "Details",
      field: "details",

      render: (rowData) => {
        const details = rowData.details;
        return (
          <div>
            <Paper
              id="peppy"
              dangerouslySetInnerHTML={{ __html: `${details}` }}
              style={{ maxHeight: 200, maxWidth: 200, overflow: "auto" }}
            >
              {/* {rowData.details} */}
            </Paper>
          </div>
        );
      },
      // render: (rowData) => (
      //   // <TextareaAutosize
      //   //   minRows={3}
      //   //   maxRows={5}
      //   //   defaultValue={rowData.details}
      //   //   style={{ width: 200 }}
      //   //   readonly="readonly"
      //   // />
      // ),
      editComponent: (props) => {
        console.log(props);
        return (
          <CKEditor
            editor={ClassicEditor}
            id="classDetails"
            data={props.value}
            onChange={(event, editor) => {
              const data = editor.getData();

              // console.log(data);
              // if (data.length >= 100 && data.length <= 500) {
              props.onChange(data);
              // } else {
              //   alert("Please use between 100 to 500 characters");

              // }
            }}
          />
        );
      },
    },
    {
      title: "Class Days",
      field: "daysOfWeek",
      render: (rowData) => {
        return rowData.daysOfWeek.map((day) => {
          return <li>{day}</li>;
        });
      },
      editComponent: (props) => {
        return weekdaysInput(props);
      },
    },
    {
      title: "Class time",
      field: "timeArr",
      render: (rowData) => {
        return rowData.timeArr.map((time) => {
          return <div>{time}</div>;
        });
      },
      // editable: "never",
      editComponent: (props) => {
        return <div></div>;
      },
    },
    {
      title: "Class time table",
      field: "scheduledDates",
      render: (rowData) => {
        return (
          <div>
            <Paper style={{ maxHeight: 200, overflow: "auto" }}>
              {" "}
              <ol>
                {" "}
                {rowData.scheduledDates.map((date) => {
                  return (
                    <li>
                      {new Date(date).toLocaleDateString("en-ca") +
                        " " +
                        new Date(date).toLocaleTimeString("en-ca")}{" "}
                    </li>
                  );
                })}{" "}
              </ol>
            </Paper>
          </div>
        );
      },

      // <TextField
      //   multiline
      //   id="scheduledDates"
      //   minRows={3}
      //   maxRows={5}
      //   defaultValue={rowData.scheduledDates.map((xday) => {
      //     let date = new Date(xday);

      //     let dateString =
      //       date.toLocaleDateString("en-ca") +
      //       " " +
      //       date.toLocaleTimeString("en-ca");
      //     let listItem = document.createElement("li");
      //     listItem.textContent = dateString;
      //     datesList.appendChild(listItem);
      //     return datesList;
      //   })}
      //   style={{ width: 200 }}
      //     // />
      //   );
      // },

      editComponent: (props) => {
        return <div></div>;
      },
    },
    {
      title: "Required Materials",
      field: "requiredMaterials",
      render: (rowData) => {
        return (
          <ol>
            {" "}
            {rowData.requiredMaterials.map((reqd) => {
              return <li>{reqd}</li>;
            })}
          </ol>
        );
      },

      editComponent: (props) => {
        return (
          <div
            sx={{
              display: " flex" /* or inline-flex */,
              flexDirection: "row",
            }}
          >
            <label>Add materials required for class </label>
            <input
              style={{ margin: "5px" }}
              name="material"
              id="material"
              type="text"
              placeholder="Please add item"
            ></input>
            <input
              type="button"
              value="add tags"
              id="add"
              onClick={(e) => {
                let text = document.getElementById("material").value;
                let materialList = props.value;
                let list = document.getElementById("list");

                if (text == "") {
                  alert("Cannot add empty string");
                  return;
                }

                if (typeof materialList === "object")
                  materialList[materialList.length] = text;
                else {
                  materialList = [];
                  materialList[0] = text;
                }
                props.onChange(materialList);
                console.log(props.value);
                //
              }}
            />
            <input
              type="button"
              value="Clear list"
              id="clear"
              onClick={(e) => {
                props.onChange("");

                console.log(props.value);
              }}
            />
            <ul id="list">
              {typeof props.value === "object" ? (
                props.value.map((req) => {
                  // document.getElementById("list").appendChild(listItem);
                  return <li> {req} </li>;
                })
              ) : (
                <div></div>
              )}
            </ul>{" "}
          </div>
        );
      },
    },
    {
      title: "Reason To Attend",
      field: "reasonToAttend",
      render: (rowData) => {
        const details = rowData.reasonToAttend;
        return (
          <div>
            <Paper
              id="peppy"
              dangerouslySetInnerHTML={{ __html: `${details}` }}
              style={{ maxHeight: 200, maxWidth: 200, overflow: "auto" }}
            >
              {/* {rowData.details} */}
            </Paper>
          </div>
        );
      },
      editComponent: (props) => {
        console.log(props);
        return (
          <CKEditor
            editor={ClassicEditor}
            id="reasontoAttend"
            data={props.value}
            onChange={(event, editor) => {
              const data = editor.getData();

              console.log(data);
              props.onChange(data);
            }}
          />
        );
      },
      // validate: (rowData) =>
      //   rowData.reasonToAttend.length >= 100 &&
      //   rowData.reasonToAttend.length < 500
      //     ? ""
      //     : "Please use between 100 to 500 characters",
    },
    {
      title: "Certificate",
      field: "certificate",
      render: (rowData) => {
        if (rowData.certificate === "true") return "Yes";
        else return "No";
      },
      editComponent: (props) => {
        return (
          <select
            id="certificate"
            onChange={(e) => {
              console.log(props);
              props.onChange(e.target.value);
            }}
            defaultValue={props.value}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        );
      },
    },
    {
      title: "Is Paid",
      field: "isPaid",
      render: (rowData) => {
        if (rowData.certificate === "true") return "Yes";
        else return "No";
      },
      editComponent: (props) => {
        return (
          <select
            id="isPaid"
            onChange={(e) => {
              let price = document.getElementById("price");
              let coins = document.getElementById("coins");
              let paymentMode = document.getElementById("paymentMode");

              if (e.target.value === "true") {
                price.disabled = false;
                coins.disabled = false;
                paymentMode.disabled = false;
              } else {
                price.innerText = 0;
                props.rowData.price = 0;
                props.rowData.coins = 0;
                props.rowData.paymentMode = "cash";
                coins.innerText = 0;
                price.disabled = true;
                coins.disabled = true;
                paymentMode.disabled = true;
                paymentMode.value = "cash";
              }
              props.onChange(e.target.value);
            }}
            defaultValue={props.value}
          >
            <option value={true}>Paid</option>
            <option value={false}>Free</option>
          </select>
        );
      },
    },
    {
      title: "Price",
      field: "price",
      render: (rowData) => {
        return (
          <div>
            {" "}
            {rowData.price} <CurrencyRupeeIcon />
          </div>
        );
      },
      editComponent: (props) => {
        return (
          <input
            name="price"
            id="price"
            disabled
            type="number"
            value={props.value}
            onChange={(e) => {
              if (e.target.value <= 0) {
                alert("Price can't be negative or zero since course is paid.");
                e.target.value = "";
                return;
              }
              props.onChange(e.target.value);
            }}
          />
        );
      },
    },
    {
      title: "Payment Mode",
      field: "paymentMode",
      editComponent: (props) => {
        return (
          <select
            id="paymentMode"
            disabled
            onChange={(e) => {
              let coins = document.getElementById("coins");
              if (e.target.value === "coins" || e.target.value === "combo") {
                coins.disabled = false;
              } else {
                props.rowData.coins = 0;
                coins.disabled = true;
              }
              props.onChange(e.target.value);
            }}
            defaultValue={props.value}
          >
            {/* <option value="coins">Coins</option> */}
            <option value="cash"> Only Cash</option>
            <option value="combo">Cash and coin combo</option>
          </select>
        );
      },
    },
    {
      title: "Coins",
      field: "coins",
      render: (rowData) => {
        return (
          <div>
            {" "}
            {rowData.coins} <CurrencyRupeeIcon />
          </div>
        );
      },
      editComponent: (props) => {
        return (
          <input
            name="coins"
            id="coins"
            type="number"
            disabled
            value={props.value}
            onChange={(e) => {
              let cost = document.getElementById("price");
              let paymentMode = document.getElementById("paymentMode");

              if (e.target.value < 0) {
                alert("Price can't be negative.");
                e.target.value = "";
                return;
              }
              if (
                (paymentMode.value === "combo" ||
                  paymentMode.value === "coins") &&
                cost.value != ""
              ) {
                if (e.target.value > Number(cost.value)) {
                  alert("Coins cannot be more than price of class.");
                  return "";
                }
              }
              props.onChange(e.target.value);
            }}
          />
        );
      },
    },

    {
      title: "Content Before Class",
      field: "contentBeforeClass",
      render: (rowData) => (
        // <TextField
        //   defaultValue={rowData.contentBeforeClass}
        //   style={{ width: 200 }}
        //   size="small"
        //   maxRows={4}
        //   multiline
        //   InputProps={{
        //     readOnly: true,
        //   }}
        // ></TextField>
        <a href={rowData.contentBeforeClass} target="_blank">
          {" "}
          Preview
        </a>
      ),
      editComponent: (props) => {
        return (
          <input
            type="file"
            id="contentBeforeClass"
            name="contentBeforeClass"
            required
            onChange={(e) => {
              let previousfile = props.value;
              let error = [];

              // if (e.target.files[0].size > 1000000) {
              //   error.push("Class photo should be less than 1MB.");
              // }
              // if (CheckDimension(e.target.files[0])) {
              //   error.push("There seems an error in photo upload.");
              // }
              if (error.length < 1) {
                props.onChange(e.target.files[0]);
              } else {
                {
                  error.map((e) => {
                    alert(e);
                    props.onChange(previousfile);
                  });
                }
              }
            }}
          />
        );
      },
      filtering: false,
    },
    {
      title: "Content After Class",
      field: "contentAfterClass",
      render: (rowData) => (
        // <TextField
        //   defaultValue={rowData.contentAfterClass}
        //   style={{ width: 200 }}
        //   size="small"
        //   multiline
        //   maxRows={4}
        //   InputProps={{
        //     readOnly: true,
        //   }}
        // ></TextField>
        <a href={rowData.contentAfterClass} target="_blank">
          {" "}
          Preview
        </a>
      ),
      editComponent: (props) => {
        return (
          <input
            type="file"
            id="contentAfterClass"
            name="contentAfterClass"
            required
            onChange={(e) => {
              let previousfile = props.value;
              let error = [];

              // if (e.target.files[0].size > 1000000) {
              //   error.push("Class photo should be less than 1MB.");
              // }
              // if (CheckDimension(e.target.files[0])) {
              //   error.push("There seems an error in photo upload.");
              // }
              if (error.length < 1) {
                props.onChange(e.target.files[0]);
              } else {
                {
                  error.map((e) => {
                    alert(e);
                    props.onChange(previousfile);
                  });
                }
              }
            }}
          />
        );
      },
      filtering: false,
    },
    {
      title: "Age",
      field: "age",
      render: (rowData) => {
        {
          return rowData.age.toString();
          // return rowData.age.map((x) => {
          //   return " " + x + ",";
          // });
        }
      },
      editComponent: (props) => {
        return (
          <>
            <label>
              Minimum age to attend the class
              <input type="number" required id="minAge"></input>
            </label>
            <label>
              Maximum age to attend the class
              <input type="number" id="maxAge"></input>
            </label>
            <Button
              onClick={(e) => {
                let ageArr = [];

                let minAge = Number(document.getElementById("minAge").value);
                let maxAge = Number(document.getElementById("maxAge").value);
                if (nat(minAge) && nat(maxAge)) {
                  ageArr = Array.apply(null, {
                    length: maxAge + 1 - minAge,
                  }).map(function (_, idx) {
                    return idx + minAge;
                  });
                }
                props.onChange(ageArr);
              }}
            >
              OK
            </Button>
          </>
        );
      },
    },
    { title: "Category", field: "category" },
    {
      title: "Zoomlink",
      field: "zoomLink",
      render: (rowData) => (
        <a href={rowData.zoomLink} target="_blank">
          {" "}
          zoom{" "}
        </a>
      ),
      editComponent: (props) => {
        return (
          <TextField
            defaultValue={props.rowData.zoomLink}
            style={{ width: 200 }}
            size="small"
            onChange={(e) => {
              if (validURL(e.target.value)) {
                props.onChange(e.target.value);
              } else {
                alert("Please enter a valid url");
                e.target.value = "";
              }
            }}
          ></TextField>
        );
      },
    },
    {
      title: "Approved",
      field: "approved",
      render: (rowData) => {
        if (rowData.approved === "true") return "Yes";
        else return "No";
      },
      editable: "never",
    },
    {
      title: "Rating",
      field: "ratingGiven",
      type: "numeric",
      // validate: (rowData) =>
      //   rowData.ratingGiven > 5 && rowData.ratingGiven < 1
      //     ? "Rating should be between 1 and 5"
      //     : "",
      editable: "never",
      //   editComponent: (props) => {
      //     return (
      //       <input
      //         name="ratingGiven"
      //         id="ratingGiven"
      //         type="number"
      //         value={props.value}
      //         onChange={(e) => {
      //           if (e.target.value < 0) {
      //             alert("Rating can't be negative.");
      //             e.target.value = "";
      //             return;
      //           }
      //           props.onChange(e.target.value);
      //         }}
      //       />
      //     );
      //   },
    },
    { title: "Rating Total", field: "ratingTotal", editable: "never" },
    { title: "Enrolled count", field: "enrolledCount", editable: "never" },
    {
      title: "Tags",
      field: "teacherTags",
      render: (rowData) => {
        return (
          <ul>
            {rowData.teacherTags.map((tag) => {
              return (
                <li>
                  <div>{tag}</div>
                </li>
              );
            })}
          </ul>
        );
      },

      editComponent: (props) => {
        return (
          <div
            sx={{
              display: " flex" /* or inline-flex */,
              flexDirection: "row",
            }}
          >
            <label>Tags for class </label>
            <input
              style={{ margin: "5px" }}
              name="tags"
              id="tags"
              type="text"
              placeholder="Please add related tags"
            ></input>
            <input
              type="button"
              value="add tags"
              id="add"
              onClick={(e) => {
                let text = document.getElementById("tags").value;
                let tagList = props.value;
                let list = document.getElementById("tagList");

                if (text == "") {
                  alert("Cannot add empty string");
                  return;
                }

                if (typeof tagList === "object") tagList[tagList.length] = text;
                else {
                  tagList = [];
                  tagList[0] = text;
                }
                props.onChange(tagList);
                console.log(props.value);
                //
              }}
            />
            <input
              type="button"
              value="Clear list"
              id="clear"
              onClick={(e) => {
                let list = document.getElementById("list");
                props.onChange("");

                list.textContent = "";
                console.log(props.value);
              }}
            />
            <ul id="tagList">
              {typeof props.value === "object" ? (
                props.value.map((req) => {
                  // document.getElementById("list").appendChild(listItem);
                  return <li> {req} </li>;
                })
              ) : (
                <div></div>
              )}
            </ul>{" "}
          </div>
        );
      },
    },
    {
      title: "Teacher ID",
      field: "teacherID",
      editable: "never",
      hidden: true,
    }, // will be used in segregation
    {
      title: "Teacher Image",
      field: "teacherImage",
      render: (rowData) => (
        <img
          style={{ height: 36, cursor: "zoom-in" }}
          alt="Image preview"
          src={rowData.teacherImage}
          onClick={() => {
            window.open(
              rowData.teacherImage,
              "_blank",
              "menubar=1,resizable=1"
            );
          }}
        />
      ),
      editComponent: (props) => {
        return (
          <input
            type="file"
            id="teacherImage"
            name="file"
            defaultValue={props.teacherImage}
            accept="image/*"
            required
            onChange={(e) => {
              if (e.target.files[0].size > 1000000) {
                alert("File size should not exceed 1MB");
                e.target.value = "";
                return;
              }
              // check whether selected file is image or not
              if (e.target.files[0].type.split("/")[0] != "image") {
                alert("Only image files are allowed");
                e.target.value = "";
                return;
              }
              // check the height and width ratio of the image
              let isReturn = false;
              const img = new Image();
              img.src = URL.createObjectURL(e.target.files[0]);
              img.onload = function () {
                const height = this.height;
                const width = this.width;
                if (height > width) {
                  alert("Please upload a widescreen image. Eg: 16:9 ratio");
                  e.target.value = "";
                  isReturn = true;
                  return;
                }
              };
              if (isReturn) {
                return;
              }
            }}
          />
        );
      },
      filtering: false,
    },
    {
      title: "Teacher Name",
      field: "teacherName",
      render: (rowData) => (
        <TextField
          defaultValue={rowData.teacherName}
          style={{ width: 200 }}
          size="small"
          multiline
          InputProps={{
            readOnly: true,
          }}
        ></TextField>
      ),
      editComponent: (props) => {
        return (
          <TextField
            defaultValue={props.rowData.teacherName}
            style={{ width: 200 }}
            size="small"
            onChange={(e) => {
              if (e.target.value.length >= 1 && e.target.value.length < 50) {
                props.onChange(e.target.value);
              } else {
                alert(
                  "Teacher name field should be between 1 to 50 characters."
                );
                e.target.value = "";
              }
            }}
          ></TextField>
        );
      },
    },
  ];
  async function handleRowUpdate(newData, oldData, resolve, reject) {
    // validations

    if (newData.age.length === 0) {
      alert("Please enter age group");
      reject();
    } else if (newData.details.length < 100 || newData.details.length >= 500) {
      alert("Please enter details");
      reject();
    } else if (
      newData.displayImage === null ||
      newData.displayImage === undefined
    ) {
      alert("Please include a class photo");
      reject();
    } else if (newData.duration === "") {
      alert("Please enter duration");
      reject();
    } else if (newData.teacherName.length < 1) {
      alert("Please enter teacher name");
      reject();
    } else if (newData.certificate === "") {
      alert("Please enter certificate");
      reject();
    } else if (newData.title.length < 1 || newData.title.length >= 50) {
      alert("Please enter title");
      reject();
    } else if (
      newData.reasonToAttend.length < 100 ||
      newData.reasonToAttend.length >= 500
    ) {
      alert("Please enter reason to attend");
      reject();
    } else if (newData.zoomLink === "") {
      alert("Please enter zoom link for class");
      reject();
    } else if (newData.subSubTopic === "") {
      alert("Please enter topic 3");
      reject();
    } else if (newData.difficulty === "") {
      alert("Please enter difficulty");
      reject();
    } else if (newData.totalClasses === "1" && newData.type === "multiple") {
      alert("Please change class type to single for one class ");
      reject();
    } else if (newData.totalClasses != "1" && newData.type === "single") {
      alert("Please change class type to multiple ");
      reject();
    } else if (
      Number(newData.totalClasses) != newData.scheduledDates.length ||
      newData.totalClasses === ""
    ) {
      alert(
        "Please check the total classes and select weekdays and start date "
      );
      reject();
    } else if (newData.isPaid === "false" && newData.price != 0) {
      alert("Please change is Paid to paid ");
      reject();
    } else if (newData.isPaid === "true" && newData.price === 0) {
      alert("Please change is paid to free ");
      reject();
    } else if (query.email === "") {
      alert("Please login again to update");
      reject();
    } else {
      const dataUpdate = [...data];
      const index = oldData.tableData.id;

      let link = "";
      if (typeof newData.displayImage === "object") {
        link = await uploadFileCloud(
          newData.displayImage,
          "/classPhoto.",
          newData,
          reject
        );
        newData.displayImage = link;
      }
      if (typeof newData.contentBeforeClass === "object") {
        link = await uploadFileCloud(
          newData.contentBeforeClass,
          "/classContentBefore.",
          newData,
          reject
        );
        newData.contentBeforeClass = link;
      }
      if (typeof newData.contentAfterClass === "object") {
        link = await uploadFileCloud(
          newData.contentAfterClass,
          "/classContentAfter.",
          newData,
          reject
        );
        newData.contentAfterClass = link;
      }
      if (typeof newData.teacherImage === "object") {
        link = await uploadFileCloud(
          newData.teacherImage,
          "/teacherImage.",
          newData,
          reject
        );
        newData.teacherImage = link;
      }

      dataUpdate[index] = newData;

      fetch(
        "https://us-central1-podiumapp-15592.cloudfunctions.net/appClasses",
        {
          method: "PATCH",
          body: JSON.stringify({
            title: newData.title,
            id: newData.id,
            displayImage: newData.displayImage,
            duration: Number(newData.duration),
            startDate: newData.scheduledDates[0],
            mode: newData.mode,
            totalClasses: newData.totalClasses,
            type: newData.type,
            details: newData.details,
            daysOfWeek: newData.daysOfWeek,
            timeArr: newData.timeArr,
            scheduledDates: newData.scheduledDates,
            requiredMaterials: newData.requiredMaterials,
            reasonToAttend: newData.reasonToAttend,
            certificate: newData.certificate,
            isPaid: newData.isPaid,
            price: newData.price,
            paymentMode: newData.paymentMode,
            coins: newData.coins,
            contentBeforeClass: newData.contentBeforeClass,
            contentAfterClass: newData.contentAfterClass,
            age: newData.age,
            category: newData.category,
            zoomLink: newData.zoomLink,
            approved: true,
            ratingGiven: 0,
            ratingTotal: 0,
            enrolledCount: 0,
            teacherName: newData.teacherName,
            teacherImage: newData.teacherImage,
            teacherTags: newData.teacherTags,
            teacherID: query.email,
          }),
          headers: {
            Accept: "text/plain",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          res.text();
        })
        .then((result) => {
          setData([...dataUpdate]);
          console.log(newData);
          resolve();
          alert("Data was updated successfully!");
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
          reject();
          alert("Sorry, data was not updated.");
        });
    }
  }

  return (
    <div>
      {/* <Navibar parentCallback={callback} /> */}

      <Row>
        <Col xs={2} id="sidebar-wrapper">
          <Sidebar />
        </Col>
        <Col xs={10} id="page-content-wrapper">
          <Container fluid>
            <Paper
              sx={{
                width: "100%",
                maxHeight: "560",
                maxWidth: "200",
                overflowX: "auto",
              }}
            >
              {!data.length > 0 ? (
                <div className="loader">
                  <img
                    style={{ height: "100px", width: "200px" }}
                    id="loader"
                    src={loading}
                    alt="Loading Please Wait..."
                  ></img>
                </div>
              ) : (
                <MaterialTable
                  icons={tableIcons}
                  columns={columns}
                  data={data}
                  title="Edit Class"
                  // onKeyDown={handleKeyDown}
                  options={{
                    filtering: true,
                  }}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        handleRowUpdate(newData, oldData, resolve, reject);
                      }),

                    // onRowDelete: (oldData) =>
                    //   new Promise((resolve) => {
                    //     handleRowDelete(oldData, resolve);
                    //   }),
                  }}
                />
              )}
            </Paper>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default EditClass;
