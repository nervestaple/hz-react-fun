class Application extends React.Component {
  constructor() {
    super();
    this.state = { user: {}, statuses: {} };
  }

  render() {
    const { statuses, user } = this.state;
    const niceName = user.id ? getNiceNameFromUid(user.id) : 'nobody!!!';
    return (
      <div>
        <h1>welcome! you're: <span className="me">{niceName}</span></h1>

        <h2>say hi:</h2>
        <input />

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
