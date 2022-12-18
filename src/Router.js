import { Outlet, useRoutes } from 'react-router-dom';
import RequireAdmin from './components/RequireAdmin';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import GameCategories from './pages/gameCategories';
import LoginPage from './pages/LoginPage';
import Merchant from './pages/Merchant';
import MerchantCreate from './pages/Merchant/create';
import MerchantShow from './pages/Merchant/show';
import Game from './pages/game';
import Customer from './pages/customer';
import CustomerShow from './pages/customer/show';
import PointConfig from './pages/points';
import EditPoint from './pages/points/edit';
import PointCreate from './pages/points/create';
import Notifications from './pages/notification';
import NotificationCreate from './pages/notification/create';
import ProfileView from './pages/updateprofile';
import GameShow from './pages/game/show';
import GameCreate from './pages/game/create';
import GameEdit from './pages/game/edit';
import GameCategoryShow from './pages/gameCategories/show';
import GameCategoryCreate from './pages/gameCategories/create';
import PointBonus from './pages/pointbonus';
import PointBonusCreate from './pages/pointbonus/create';
import PointBonusEdit from './pages/pointbonus/edit';
import Clients from './pages/clients/Clients';
import AddClient from './pages/clients/AddClient';
import EnabledGame from './pages/enabledGames/EnabledGames';
import VoucherCategory from './pages/Merchant/vouchers/VoucherCategory';
import CreateVoucherCategory from './pages/Merchant/vouchers/CreateVoucherCategory';
import VoucherLists from './pages/Merchant/vouchers/VoucherLists';
import Sites from './pages/sites/Sites'
import SiteCreate from './pages/sites/SiteCreate'
import SiteEdit from './pages/sites/SiteEdit'
import Vouchers from './pages/voucher/Vouchers';
import AddVoucher from './pages/voucher/AddVoucher';
import VoucherList from './pages/voucher/VoucherLists';
import VoucherUserList from './pages/voucher/VoucherUserList';
import SiteSetting from './pages/SiteSetting';
import UserPlayed from './pages/game/UserPlayed';
import Banners from './pages/banners/Banners';
import AddBanners from './pages/banners/AddBanners';
import PointHistory from './pages/pointHistor/PointHistory';
import PointBadge from './pages/badge/PointBadge';
import AddPointBadge from './pages/badge/AddPointBadge';
import NotFoundPage from './pages/NotFoundPage';
import VoucherBatch from './pages/voucher/VoucherBatch';
import PdfReader from './components/PdfReader';
import MerchantVoucherBatch from './pages/Merchant/vouchers/MerchantVoucherBatch';
import GamesHistory from './pages/game/history';
import AlternateGame from './pages/game/AlternateGame';
import ForgetPassword from './pages/ForgetPassword';



function Router() {
  const element = useRoutes([
    {
      element: <MainLayout />,
      path: '/',
      children: [
        { path: 'dashboard', index: true, element: <Dashboard /> },
        { path: '/', element: <Dashboard /> },
        {
          path: 'merchants', element: <Outlet />, children: [
            { element: <Merchant />, index: true, },
            {
              element: <Outlet />, path: ':id', children: [
                { element: <MerchantShow />, index: true },
                {
                  element: <Outlet />, path: "vouchers", children: [
                    { element: <VoucherCategory />, index: true },
                    { element: <CreateVoucherCategory />, path: "create" },
                    {
                      element: <Outlet />, path: ":uid/batch", children: [
                        {
                          element: <Outlet />, children: [
                            { element: <MerchantVoucherBatch />, index: true },
                            { element: <VoucherLists />, path: ':batch' },


                          ]
                        },

                      ]
                    },
                  ]
                },


              ]
            },
            { element: <MerchantCreate />, index: true, path: 'create' },
          ]
        },
        {
          path: 'customers', element: <Outlet />, children: [
            { element: <Customer />, index: true, },
            { element: <CustomerShow />, index: true, path: ':id/show' },
            { element: <MerchantCreate />, index: true, path: 'create' },
          ]
        },
        {
          path: 'games', element: <Outlet />, children: [
            {
              element: <Outlet />, path: 'category', children: [
                { element: <GameCategories />, index: true, },
                { element: <Outlet />, path: ":id", children:[
                  { element: <GameCategoryShow />, index: true },
                 
                ] },
                { element: <GameCategoryCreate />, path: "create" },
              ]
            },
            {
              element: <Outlet />, path: 'enabled-game', children: [
                { element: <EnabledGame />, index: true },
              ]
            },
            {
              element: <Outlet />, path: 'alternate-game', children: [
                { element: <AlternateGame />, index: true },
              ]
            },
            {
              element: <Outlet />, path: 'game', children: [
                { element: <Game />, index: true },
                {
                  element: <Outlet />, path: ":id", children: [
                    { element: <GameShow />, index: true },
                    { element: <GameEdit />, path:"edit" },
                    { element: <Outlet/>, path:'history', children:[
                      { element: <GamesHistory />, index:true },
                      { element: <UserPlayed />, path: ":uid/users" },
                    ] },


                  ]
                },
                { element: <GameEdit />, path: ":id/edit" },
                { element: <GameCreate />, path: "create" },
              ]
            },
          ]
        },

        {
          path: 'point-config', element: <Outlet />, children: [
            { element: <PointConfig />, index: true },
            { element: <EditPoint />, path: ':id/edit' },
            { element: <PointCreate />, path: 'create' },

          ]
        },
        {
          path: 'point-badge', element: <Outlet />, children: [
            { element: <PointBadge />, index: true },
            { element: <AddPointBadge />, path: 'create' },

          ]
        },
        {
          path: 'point-history', element: <Outlet />, children: [
            { element: <PointHistory />, index: true },
          ]
        },
        {
          path: 'point-bonus', element: <Outlet />, children: [
            { element: <PointBonus />, index: true },
            { element: <PointBonusEdit />, path: ':id/edit' },
            { element: <PointBonusCreate />, path: 'create' },
          ]
        },
        {
          path: 'sites', element: <Outlet />, children: [
            { element: <Sites />, index: true },
            { element: < SiteEdit />, path: ':id/edit' },
            { element: <SiteCreate />, path: 'create' },
          ]
        },
        {
          path: 'notifications', element: <Outlet />, children: [
            { element: <Notifications />, index: true },
            { element: <NotificationCreate />, path: 'create' },

          ]
        },
        {
          path: 'clients', element: <Outlet />, children: [
            { element: <Clients />, index: true },
            { element: <AddClient />, path: 'create' },

          ]
        },
        {
          path: 'banners', element: <Outlet />, children: [
            { element: <Banners />, index: true },
            { element: <AddBanners />, path: 'create' },

          ]
        },
        {
          path: 'voucher', element: <Outlet />, children: [
            { element: <Vouchers />, index: true },
            {
              element: <Outlet />, path: ":id/batch", children: [
                {
                  element: <Outlet />, children: [
                    { element: <VoucherBatch />, index: true },
                    { element: <VoucherList />, path: ':batch' },

                  ]
                },

                { element: <VoucherUserList />, path: 'users/:uid' },

              ]
            },
            { element: <AddVoucher />, path: 'create' },

          ]
        },
        {
          path: 'profile', element: <Outlet />, children: [
            { element: <ProfileView />, index: true },
            { element: <NotificationCreate />, path: 'create' },

          ]
        },
        { path: '/pdf', element: <PdfReader />, },


      ],
    },
    {
      element: <SiteSetting />,
      path: '/site-setting',
    },
    {
      element: <LoginPage />,
      path: '/login',
    },
    {
      element: < ForgetPassword/>,
      path: '/forget-password',
    },
    {
      element: <NotFoundPage />,
      path: '*',
    },
  ]);

  return element;
}
export default Router;
