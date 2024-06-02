const Notification = ({msg, error}) => (
  <div className={`Notification__container ${error ? 'Notification__container--error' : 'Notification__container--success'}`}>
    <p className="Notification__msg">
    {msg}
    </p>
  </div>
)

export default Notification