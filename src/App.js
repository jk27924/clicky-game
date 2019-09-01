import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";


class App extends Component {

  state = {
    friends,
      // Setting this.state.friends to the friends json array
    clickedFriends: [],
      // This is to hold the ids of clicked friends in an array.
    topScore: 0,
    currentScore: 0
      // Put these two scores in state object, because they keep changing.
  };


  shuffleFriend = (friend) => {
    // Switched (friends) to (friend), because I use friend to pass component props to the function, and friends is the actual props from a component.

    // A Function that checks if a friend has already been clicked, and those clicked ones' ids need to store inside of the array clickedFriends.    
    const addClickedFriends = this.state.clickedFriends;
    addClickedFriends.push(friend.id);

    this.setState({
      clickedFriends: addClickedFriends
    })
    // This changes the state to addClickedFriends..

    console.log (addClickedFriends);
    // Returns an array with clicked cards' ids stored inside.

    console.log(friend.id);
    // This returns the id of selected card, NOT in an array.


  const newFriends = this.state.friends;
  // Thought I am not supposed to use const, since the cards are changing with onClick function. BUT since it is just shifting items around the same array, Using const would not matter.

    // Use 'for loop' to randomize the order of friend cards when showing on the DOM / math.random will help randomizing / add math.floor to round up to avoid gettin zero / i + 1 is also need to avoid getting zero.
    for (var i = newFriends.length - 1; i > 0; i--) {
      console.log(i);

      var randomOrder = Math.floor(Math.random() * (i + 1));
      var holder = newFriends[i];
      // newFriends[i]: it hold the actual data that I am using, which is newFriends.
      newFriends[i] = friends[randomOrder];
      newFriends[randomOrder] = holder;
      console.log(holder);
    }
    // return friends;
    this.setState({'friends': newFriends});
  };


  handleClick = () => {
    this.setState({ friends: this.shuffleFriend(friends) });
  }; 


  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>Friends List</Title>
        {this.state.friends.map(friend => (
          <FriendCard
            shuffleFriend={this.shuffleFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
          />
        ))}
      </Wrapper>
    );
  }
}


export default App;
