const hz = Horizon({ authType: 'anonymous' });
hz.connect();

class Application extends React.Component {
  constructor() {
    super();
    this.state = { user: {}, statuses: {} };

    this.onHorizonReady = this.onHorizonReady.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  componentDidMount() {
    hz.onReady(this.onHorizonReady);
  }

  onHorizonReady() {
    hz.currentUser().fetch().subscribe(user => this.setState({ user }));
    hz('statuses').watch().subscribe(statuses => this.setState({ statuses }));
  }

  onStatusChange(e) {
    const { user } = this.state;
    if (user && user.id && e.target.value) {
      hz('statuses').upsert({ id: user.id, text: e.target.value });
    }
  }

  render() {
    const { statuses, user } = this.state;
    return (
      <div>
        <h1>welcome! you're: <span className="me">{getNiceNameFromUid(user.id)}</span></h1>

        <h2>say hi:</h2>
        <input onChange={this.onStatusChange}/>

        <h2>known users:</h2>
        <StatusList statuses={statuses} />

      </div>
    );
  }
}

const StatusList = ({ statuses }) => (
  <div>
    {statuses.length === 0 ? <p>nobody {':('}</p> : <div />}

    <dl>
      {_.values(statuses).map(s => (
        <div key={s.id}>
          <dt>
            {getNiceNameFromUid(s.id)}
          </dt>
          <dd>
            {s.text}
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

ReactDOM.render(<Application />, document.getElementById('app'));
