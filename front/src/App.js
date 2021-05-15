//import "./styles.css";
import React from "react";
import axios from "axios";
import _ from "lodash";
import { Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userlist: [],
      userInput: "",
      ENDPOINT_GET_USER: "https://jsonplaceholder.typicode.com/users",
      randomColor: ['"Danger"', '"Info"', '"Success"'],
      selectedColor: "",
      inputString: ""
    };
  }

  checkObject = (value, key) => {
    if (typeof value === "object") {
      return _.map(value, (subiValue, subiKey) => {
        return (
          <p>
            {subiKey} : {subiValue} <br />
          </p>
        );
      });
    } else {
      return (
        <p>
          {key} : {value} <br />
        </p>
      );
    }
  };

  componentDidMount() {
    axios.get(this.state.ENDPOINT_GET_USER).then((res) => {
      this.setState({ userlist: res.data });
      this.setState({ userlistLodash: res.data.slice(0, 5) });
      this.setState({ userListTitle: res.data[0] });
      this._getRandomColor();
    });
  }

  _getRandomColor() {
    var item = this.state.randomColor[
      Math.floor(Math.random() * this.state.randomColor.length)
    ];
    this.setState({
      selectedColor: item
    });
  }

  checkObject = (value, key) => {
    if (typeof value === "object") {
      return _.map(value, (subiValue, subiKey) => {
        return (
          <p>
            {subiKey} : {subiValue} <br />
          </p>
        );
      });
    } else {
      return (
        <p>
          {key} : {value} <br />
        </p>
      );
    }
  };

  handleChange = (event) => {
    this.setState({ userInput: event.target.value });
  };

  render() {
    const { userInput, userlist } = this.state;
    const lowercasedFilter = userInput.toLowerCase();
    const filteredData = userlist.filter((item) => {
      console.log(lowercasedFilter);

      return Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(lowercasedFilter)
      );
      /*
      return
      _.map(item, (fVal, fkey) =>{
        if (_.isObject(fVal)){
          return(
            _.map(fVal, (subValue, subKey) => {
              return this.checkObject(subValue, subKey)
            })
          )
        }
        else{

        }
      }
      )
      */

      //if item[key] is object need to loop again, need to create function?
    });

    return (
      <div>
        <br />

        <input
          type="String"
          value={this.state.inputString}
          onChange={(e) => {
            this.setState({ inputString: e.target.value });
          }}
        />
        <Button
          variant="success btn-sm"
          onClick={(e) => this.setState({ userInput: this.state.inputString })}
        >
          Search
        </Button>

        <Container fluid>
          <Row className="row justify-content-center">
            <Col className="row justify-content-center col-md-10  ">
              {_.map(filteredData, (data) => {
                return (
                  <Card style={{ width: "18rem" }} bg={"dark"}>
                    <Card.Body>
                      <Card.Text>
                        {_.map(data, (val, key) => {
                          if (typeof val === "object") {
                            return (
                              <p>
                                {key} <br />
                                {_.map(val, (subValue, subKey) => {
                                  return this.checkObject(subValue, subKey);
                                })}
                              </p>
                            );
                          } else {
                            return (
                              <p>
                                {key} : {val} <br />
                              </p>
                            );
                          }
                        })}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
