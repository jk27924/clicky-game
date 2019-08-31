import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends
  };

  shuffleFriend = (friends) => {
  // use for loop to randomize the order of friend cards when showing / math.random will help randomizing / add math.floor to round up to avoid gettin zero / i + 1 is also need to avoid getting zero
  console.log(friends);

    for (var i = friends.length - 1; i > 0; i--) {
      console.log(i);
      var randomOrder = Math.floor(Math.random() * (i + 1));
      var holder = friends[i];
      // friends[i]: it hold the actual data that I am using, which is friends.
      friends[i] = friends[randomOrder];
      friends[randomOrder] = holder;
      console.log(holder);
    }
    return friends;
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
