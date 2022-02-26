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

function ApproveClass() {
  const [query, setQuery] = useState({
    age: "",
    isPaid: "",
    mode: "",
    category: "",
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
    url += (url.indexOf("?") === -1 ? "?" : "&") + queryParams(query);
    // var header = {
    //   "Content-Type": "application/json",
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    // };
    var requestOptions = {
      // header: header,
      method: "GET",

      redirect: "follow",
    };
    console.log(query);

    fetch(url, requestOptions)
      .then((response) => {
        console.log(response);

        return response.json();
      })
      .then((result) => {
        console.log(result);
        let arr = [];
        arr = result.classes;
        setData(arr);

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
  function AuthorisedUser() {
    if (
      query.email === "farhan@podium.school" ||
      query.email === "pragya@podium.school"
    ) {
      return (
        <Container fluid>
          <Paper
            sx={{
              width: "100%",

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
                title="Approve Class"
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
      );
    } else {
      return <div> Sorry, you are not authorised for this information.</div>;
    }
  }
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
    { title: "Class ID", field: "id", hidden: "true" },
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

      editable: "never",
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
      editable: "never",
      filtering: false,
    },
    {
      title: "Duration",
      field: "duration",
      render: (rowData) => <div>{rowData.duration + " minutes"}</div>,
      editable: "never",
    },
    {
      title: "Mode",
      field: "mode",
      editable: "never",
    },
    {
      title: "Total classes",
      field: "totalClasses",

      editable: "never",
    },
    {
      title: "Type",
      field: "type",
      editable: "never",
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
      editable: "never",
    },
    {
      title: "Class Days",
      field: "daysOfWeek",
      render: (rowData) => {
        return rowData.daysOfWeek.map((day) => {
          return <li>{day}</li>;
        });
      },
      editable: "never",
    },
    {
      title: "Class time",
      field: "timeArr",
      render: (rowData) => {
        return rowData.timeArr.map((time) => {
          return <div>{time}</div>;
        });
      },
      editable: "never",
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

      editable: "never",
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

      editable: "never",
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
      editable: "never",
    },
    {
      title: "Certificate",
      field: "certificate",
      render: (rowData) => {
        if (rowData.certificate === "true") return "Yes";
        else return "No";
      },
      editable: "never",
    },
    {
      title: "Is Paid",
      field: "isPaid",
      render: (rowData) => {
        if (rowData.certificate === "true") return "Yes";
        else return "No";
      },
      editable: "never",
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
      editable: "never",
    },
    {
      title: "Payment Mode",
      field: "paymentMode",
      editable: "never",
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
      editable: "never",
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
      editable: "never",
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
      editable: "never",
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
      editable: "never",
    },
    { title: "Category", field: "category", editable: "never" },
    {
      title: "Zoomlink",
      field: "zoomLink",
      render: (rowData) => (
        <a href={rowData.zoomLink} target="_blank">
          {" "}
          zoom{" "}
        </a>
      ),
      editable: "never",
    },
    {
      title: "Approved",
      field: "approved",
      render: (rowData) => {
        if (rowData.approved === "true") return "Yes";
        else return "No";
      },
      editComponent: (props) => {
        return (
          <select
            onChange={(e) => {
              let res = e.target.value === "true";
              props.onChange(res);
              console.log(props);
            }}
          >
            <option value={true}> Yes</option>
            <option value={false}>No</option>
          </select>
        );
      },
    },
    {
      title: "Rating",
      field: "ratingGiven",
      type: "numeric",

      editable: "never",
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

      editable: "never",
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
      editable: "never",
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
          onChange={(e) => {
            let len = e.target.value.length;
            if (len > 1 && len <= 50) {
            }
          }}
        ></TextField>
      ),
      editable: "never",
    },
  ];
  async function handleRowUpdate(newData, oldData, resolve, reject) {
    // validations
    debugger;

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
            startDate: newData.scheduledDates[0],
            displayImage: newData.displayImage,
            duration: Number(newData.duration),
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
          <AuthorisedUser />
        </Col>
      </Row>
    </div>
  );
}

export default ApproveClass;
