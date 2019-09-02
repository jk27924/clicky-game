import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";


class App extends Component {

  state = {
    friends, // Setting this.state.friends to the friends json array
    clickedFriends: [], // This is to hold the ids of clicked friends in an array.
    topScore: 0,
    currentScore: 0 // Put these two scores in state object, because they keep changing.
  };


  shuffleFriend = (friend) => {
    // Switched (friends) to (friend), because I use friend to pass component props to the function, and friends is the actual props from a component.

    // A Function Below checks if a friend has already been clicked, and those clicked ones' ids need to store inside of the array clickedFriends.    

    const addClickedFriends = this.state.clickedFriends;
    // console.log (addClickedFriends);
      // Returns an array with clicked cards' ids stored inside.

    if (addClickedFriends.indexOf(friend.id) === -1) {
      // If the clicked ID is NOT in the array,

      addClickedFriends.push(friend.id)
      // Adding ids of clicked friend cards into an array

      this.setState({
      currentScore: this.state.currentScore + 1,
      // Incrementing per each click for current score

      topScore: this.state.currentScore + 1 > this.state.topScore ? this.state.currentScore + 1: this.state.topScore
      // Ternary: Using ? means IF statement before ? is TRUE, the left-hand will work. ELSE the right-hand will work.
      })

    } else {
      // If the clicked ID is already in the array,

       this.setState({ 
        clickedFriends: [], // The array becomes empty
        currentScore: 0, // The Current Score will be back to ZERO
      })
      console.log("You Lost");
    };
    


  const newFriends = this.state.friends;
  // Const is used, B/C it is just shifting items around the same array, and it is not changing the actual array itself.
    // FOR LOOP is used to randomize the order of friend cards when showing on the DOM
    // math.random randomizes / math.floor rounds up to avoid gettin zero
    for (var i = newFriends.length - 1; i > 0; i--) {

      var randomOrder = Math.floor(Math.random() * (i + 1));
      var holder = newFriends[i]; // newFriends[i]: it hold the actual data that I am using, which is newFriends.
      newFriends[i] = friends[randomOrder];
      newFriends[randomOrder] = holder;
    }

    this.setState({'friends': newFriends});
  };


  handleClick = () => {
    this.setState({ friends: this.shuffleFriend(friends) });
  }; 


  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>Clicky Game with Friends</Title>
        <h2>Click on an image to earn points, but don't click on any more than once.</h2>
        <br/>
        <h2 className="scoreBoard">
          Current Score: {this.state.currentScore}  | 
          Top Score: {this.state.topScore}
        </h2>

        {this.state.friends.map(friend => (
          <FriendCard
            shuffleFriend={this.shuffleFriend}
            id={friend.id}
            key={friend.id}
            image={friend.image}
          />
        ))}
      </Wrapper>
    );
  }
}


export default App;
