import useClickOutside from 'helpers/clickOutside';
import { useRef } from 'react';
import { create, menu as menuItems } from 'data/allMenu';
import AllMenuItem from './AllMenuItem';

const AllMenu = ({}) => {
  return (
    <div className="all_menu">
      <div className="all_menu_header">Menu</div>
      <div className="all_menu_wrap scrollbar">
        <div className="all_left">
          <div className="all_menu_search">
            <i className="amm_s_ic"></i>
            <input type="text" placeholder="Search Menu" />
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Social</div>
            {menuItems.slice(0, 6).map((el, index) => (
              <AllMenuItem
                key={index}
                name={el.name}
                icon={el.icon}
                description={el.description}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Entertainment</div>
            {menuItems.slice(6, 9).map((el, index) => (
              <AllMenuItem
                key={index}
                name={el.name}
                icon={el.icon}
                description={el.description}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Shopping</div>
            {menuItems.slice(9, 11).map((el, index) => (
              <AllMenuItem
                key={index}
                name={el.name}
                icon={el.icon}
                description={el.description}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Personal</div>
            {menuItems.slice(11, 15).map((el, index) => (
              <AllMenuItem
                key={index}
                name={el.name}
                icon={el.icon}
                description={el.description}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Professional</div>
            {menuItems.slice(15, 17).map((el, index) => (
              <AllMenuItem
                key={index}
                name={el.name}
                icon={el.icon}
                description={el.description}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Community Resources</div>
            {menuItems.slice(17, 21).map((el, index) => (
              <AllMenuItem
                key={index}
                name={el.name}
                icon={el.icon}
                description={el.description}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">More from Meta</div>
            {menuItems.slice(21, 23).map((el, index) => (
              <AllMenuItem
                key={index}
                name={el.name}
                icon={el.icon}
                description={el.description}
              />
            ))}
          </div>
        </div>
        <div className="all_right">
          <div className="all_right_header">Create</div>
          {create.map((el, index) => (
            <div className="all_right_item hover1" key={index}>
              <div className="all_right_circle">
                <i className={el.icon}></i>
              </div>
              {el.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMenu;
