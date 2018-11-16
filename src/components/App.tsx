import React, { PureComponent } from 'react';
import { fetchHello } from '../apis/hello';

class App extends PureComponent {
  public state = {
    errored: false,
    fetching: false,
    hello: '',
  };

  public async componentDidMount() {
    try {
      const { hello } = await fetchHello();
      this.setState({
        fetching: false,
        hello,
      });
    } catch (err) {
      this.setState({ errored: true });
    }
  }

  public render() {
    const { errored, fetching, hello } = this.state;
    if (fetching) { return <div>fetching</div>; }
    if (errored) { return <div>errored</div>; }
    return <div>hello {hello}</div>;
  }
}

export default App;
