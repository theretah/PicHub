interface Props {
  isMedium: boolean;
  isSelected: boolean;
  selectRecord: () => void;
}
const MessageRecord = ({ isMedium, isSelected, selectRecord }: Props) => {
  return (
    <li
      className={`list-group-item list-group-item-action list-group-item-dark-custom border-0 ${
        isSelected ? "active" : ""
      }`}
      onClick={selectRecord}
    >
      <div className="row" style={{ width: 395 }}>
        <div className="p-0" style={{ width: 55, height: 55 }}>
          <img
            src={"../../../public/images/profiles/default-profile.jpg"}
            alt=""
            height={55}
            width={55}
            className="rounded-circle object-fit-contain d-inline"
          />
        </div>
        {!isMedium && (
          <div className="col ps-2">
            <p className="m-0 text-light">username</p>
            <span className="text-gray" style={{ fontSize: 13 }}>
              Active 37m ago
            </span>
          </div>
        )}
      </div>
    </li>
  );
};

export default MessageRecord;
