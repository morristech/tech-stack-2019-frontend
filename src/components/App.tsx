import React, { PureComponent } from 'react';

const API = 'http://localhost:3000';

class App extends PureComponent {
  public state = {
    fetching: false,
  };

  public async componentDidMount() {
    try {
      const response = await fetch(API);
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.log(err);
    }
  }

  public render() {
    return <div>Testing 1</div>;
  }
}

export default App;
