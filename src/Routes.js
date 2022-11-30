import React from 'react';
import { MdDashboard, MdGames, MdOutlineSettings, MdLocalOffer, MdNotificationsNone } from 'react-icons/md'
import { FiUsers, FiUser } from 'react-icons/fi'
import { BiBadge, BiHistory } from "react-icons/bi"
import { RiCoupon3Line } from "react-icons/ri"
import { SiSitepoint } from 'react-icons/si'

const Routes = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'dashboard',
        icon: <><MdDashboard /></>,
        link: 'dashboard'
      },
    ],
  },
  {
    title: 'Game',
    links: [

      {
        name: 'Games',
        icon: <MdGames />,
        link: 'games/game'
      },
      {
        name: 'Enabled Games',
        icon: <MdGames />,
        link: 'games/enabled-game'
      },
      {
        name: 'Alternate Games',
        icon: <MdGames />,
        link: 'games/alternate-game'
      },
      {
        name: 'Games Category',
        icon: <MdGames />,
        link: 'games/category'
      },
    ],
  },
  {
    title: 'Users',
    links: [
      {
        name: 'Merchants',
        icon: <><FiUser /></>,
        link: 'merchants'
      },
      {
        name: 'Customers',
        icon: <><FiUsers /></>,
        link: 'customers'
      },
    ],
  },
  {
    title: 'Points',
    links: [
      {
        name: 'Points Config',
        icon: <><MdOutlineSettings /></>,
        link: 'point-config'
      },
      {
        name: 'Points History',
        icon: <><BiHistory /></>,
        link: 'point-history'
      },
      {
        name: 'Points Badge',
        icon: <><BiBadge /></>,
        link: 'point-badge'
      },

    ],
  },
  {
    title: 'Notifications',
    links: [
      {
        name: 'Notifications',
        icon: <><MdNotificationsNone /></>,
        link: 'notifications'
      },


    ],
  },
  {
    title: 'Clients',
    links: [
      {
        name: 'Clients',
        icon: <><MdNotificationsNone /></>,
        link: 'clients'
      },


    ],
  },
  {
    title: 'Banners',
    links: [
      {
        name: 'Banners',
        icon: <><MdLocalOffer /></>,
        link: 'banners'
      },


    ],
  },
  {
    title: 'Voucher',
    links: [
      {
        name: 'Our Vouchers',
        icon: <><RiCoupon3Line /></>,
        link: 'voucher'
      },


    ],
  },
  {
    title: 'Sites',
    links: [
      {
        name: 'Sites',
        icon: <><SiSitepoint /></>,
        link: 'sites'
      },
    ],
  },
];
export default Routes;
