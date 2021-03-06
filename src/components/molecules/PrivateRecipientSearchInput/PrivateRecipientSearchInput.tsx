import React, { useRef, useState } from "react";
import { User } from "types/User";
import { Dropdown, FormControl } from "react-bootstrap";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import "./PrivateRecipientSearchInput.scss";

interface PropsType {
  setSelectedUser: (user: User) => void;
}

const PrivateRecipientSearchInput: React.FunctionComponent<PropsType> = ({
  setSelectedUser,
}) => {
  const debouncedSearch = debounce((v) => setSearchValue(v), 500);
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const onClickOnUserInSearchInput = (user: User) => {
    setSearchValue("");
    setSelectedUser(user);
  };

  const { userArray } = useSelector((state: any) => ({
    userArray: state.firestore.ordered.users,
  }));

  return (
    <div className="private-recipient-search-input-container">
      <Dropdown
        onToggle={(isOpen: boolean) => {
          if (!isOpen) {
            setSearchValue("");
            if (searchRef?.current) {
              searchRef.current.value = "";
            }
          }
        }}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Search for partygoer..."
          onChange={(e) => {
            debouncedSearch(e.target.value);
          }}
          ref={searchRef}
        />
        {searchValue && (
          <ul className="floating-dropdown">
            {userArray
              .filter((u: User) =>
                u.partyName?.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((u: User) => (
                <Dropdown.Item
                  onClick={() => onClickOnUserInSearchInput(u)}
                  id="private-chat-dropdown-private-recipient"
                  className="private-recipient"
                  key={u.id}
                >
                  <img
                    src={u.pictureUrl}
                    className="picture-logo"
                    alt={u.partyName}
                    width="20"
                    height="20"
                  />
                  {u.partyName}
                </Dropdown.Item>
              ))}
          </ul>
        )}
      </Dropdown>
    </div>
  );
};

export default PrivateRecipientSearchInput;
