import React, { Component } from "react";
import { Link } from "react-router-dom";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Header from "../Header";
import "./Registration.css";
import Footer from "../Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Note from "./Note";

class Needs1 extends Component {
  state = {
    youinasentence: "",
    position: "",
    brand: "",
    website: "",
    adress: "",
    city: "",
    zip: "",
    country: "",
    telephone: "",
    language: "",
    // Tagging for Category
    tagsCategory: [],
    tagCategory: "",
    suggestedTagsCategory: [
      "men",
      "women",
      "stone",
      "lether",
      "denim",
      "plastic",
      "coffee"
    ],
    // Tagging for Material
    tagsMaterial: [],
    tagMaterial: "",
    suggestedTagsMaterial: [
      "men",
      "women",
      "stone",
      "lether",
      "denim",
      "plastic",
      "coffee"
    ],
    // Tagging for Destination
    tagsDestination: [],
    tagDestination: "",
    suggestedTagsDestination: [
      "men",
      "women",
      "stone",
      "lether",
      "denim",
      "plastic",
      "coffee"
    ]
  };

  // Remove Tags
  handleChange(tags, changed, changedIdx, toChange) {
    let field = `tags${toChange}`;
    this.setState({
      [field]: tags
    });
  }

  // Add Own Tag
  onChangeInput(tag, toChange, tags) {
    let field = `tag${toChange}`;
    console.log(tag);
    this.setState({
      [field]: tag
    });
  }

  // Add Suggested Tag
  addNewOne(event, change, toChange, field) {
    let copy = toChange;

    if (copy.includes(change[0]) === false) {
      copy.push(change[0]);
      this.setState({
        [field]: copy
      });
    }
  }

  render() {
    return (
      <div>
        <Header url={this.props.match.url} />

        {/*Process Bar */}
        <div>
          <h1 className="registrationHeading">2/4: About You</h1>
          <div className="registrationBarContainer">
            <div className="registrationBarComponent registrationBarInactive registrationBarMiddle" />
            <div className="registrationBarComponent registrationBarInactive registrationBarMiddle" />
            <div className="registrationBarComponent registrationBarActive registrationBarMiddle" />
            <div className="registrationBarComponent registrationBarInactive" />
          </div>
        </div>

        <Container className="registrationContainerAndNote">
          <Row>
            <Col xs lg="7" className="registrationContainer">
              <h2 className="registrationHeadline">Specify your needs</h2>
              <p className="registrationSubtitle">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
              <form className="registrationForm">
                {/* CATEGORY */}
                <div className="parentTag">
                  <label htmlFor="category">
                    What category are you working in?
                  </label>
                  <div className="inputField">
                    <TagsInput
                      id="category"
                      value={this.state.tagsCategory}
                      onChange={(tags, changed, changedIdx) =>
                        this.handleChange(tags, changed, changedIdx, "Category")
                      }
                      inputValue={this.state.tagCategory}
                      onChangeInput={(tag, toChange) =>
                        this.onChangeInput(
                          tag,
                          "Category",
                          this.state.tagsCategory
                        )
                      }
                    />
                  </div>
                  <TagsInput
                    className="suggestedTags"
                    value={this.state.suggestedTagsCategory}
                    onChange={(event, change, toChange) =>
                      this.addNewOne(
                        event,
                        change,
                        this.state.tagsCategory,
                        "tagsCategory"
                      )
                    }
                  />
                </div>

                {/* MATERIALS */}

                <div className="parentTag">
                  <label htmlFor="materials">
                    The materials you like to work with?
                  </label>
                  <div className="inputField">
                    <TagsInput
                      id="materials"
                      value={this.state.tagsMaterial}
                      onChange={(tags, changed, changedIdx) =>
                        this.handleChange(tags, changed, changedIdx, "Material")
                      }
                      inputValue={this.state.tagMaterial}
                      onChangeInput={(tag, toChange) =>
                        this.onChangeInput(tag, "Material")
                      }
                    />
                  </div>
                  <TagsInput
                    className="suggestedTags"
                    value={this.state.suggestedTagsMaterial}
                    onChange={(event, change, toChange) =>
                      this.addNewOne(
                        event,
                        change,
                        this.state.tagsMaterial,
                        "tagsMaterial"
                      )
                    }
                  />
                </div>

                {/* DESTINATION */}

                <div className="parentTag">
                  <label htmlFor="destination">Destination</label>
                  <div className="inputField">
                    <TagsInput
                      id="destination"
                      value={this.state.tagsDestination}
                      onChange={(tags, changed, changedIdx) =>
                        this.handleChange(
                          tags,
                          changed,
                          changedIdx,
                          "Destination"
                        )
                      }
                      inputValue={this.state.tagDestination}
                      onChangeInput={(tag, toChange) =>
                        this.onChangeInput(tag, "Destination")
                      }
                    />
                  </div>
                  <TagsInput
                    className="suggestedTags"
                    value={this.state.suggestedTagsDestination}
                    onChange={(event, change, toChange) =>
                      this.addNewOne(
                        event,
                        change,
                        this.state.tagsDestination,
                        "tagsDestination"
                      )
                    }
                  />
                </div>

                <label htmlFor="capacity">Production capacity</label>
                <textarea id="capacity" />

                <label htmlFor="lookingfor">You are looking for</label>
                <textarea id="lookingfor" />
                <div className="registrationNeedsButtons">
                  <Link to="/aboutyou">
                    <button className="registrationBackButton" type="button">
                      Back
                    </button>
                  </Link>
                  <button className="registrationNextButton" type="submit">
                    Next
                  </button>
                </div>
              </form>
            </Col>
            <Col xs lg="3">
              <Note />
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Needs1;
