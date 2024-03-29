import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

const navigation = [
  // { name: 'Home', href: '/', current: true },
  // { name: 'Team', href: '#', current: false },
  // { name: 'Projects', href: '#', current: false },
  // { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}




export default function Example() {

  
  const toast = useToast();
  const SuccessToast = (title, description) => {
    toast({
      title: title,
      description: description,
      status: "success",
      duration: 3000,
      position: "top",
      variant: "subtle",
      isClosable: true,
    });
  };
  const ErrorToast = (title, description) => {
    toast({
      title: title,
      description: description,
      status: "error",
      duration: 3000,
      position: "top",
      variant: "subtle",
      isClosable: true,
    });
  };
  const handleLogout = () => {
  
    if (window.confirm('Are you sure you want to logout?')) {
      // Send a POST request to the logout API
      Cookies.remove('authToken');
      window.location.href = '/';
      axios.post('http://localhost:8000/auth/logout').then(response => {
          if (response.status === 200) {
            // Logout was successful, remove the token and redirect
            Cookies.remove('authToken');
            localStorage.removeItem('authToken');
            SuccessToast('Logout Succesfull', 'You have been logged out')
            window.location.href = '/login'; // Replace with your login page URL
          } else {
            // Handle the API response in case of an error
            console.error('Logout failed:', response.data);
          }
        })
        .catch(error => {
          // Handle any Axios request errors
          ErrorToast('Logout failed', 'Please try again')
          console.error('Axios request failed:', error);
        });
    }
  }

  const [user, setUser] = useState([{'id':'','username':'',}]);
    // const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get('authToken');
      console.log(token);
    // Check if the user is authenticated
    if (!token) {
      // Redirect to the login page if no token is found
      history.push('/login');
    }

    // Make an authenticated API request to fetch user data
    fetchUserData(token);
  }, []);
  const fetchUserData = async (token) => {
    // Send the token with the request to authenticate
    try {
      const response = await axios.get('http://localhost:8000/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      
      setUser(response.data.data);
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };

    let showMenu = '';
    if(user.id_role === 1){
      showMenu = 'Customer';
    }else if(user.id_role === 2){
      showMenu = 'SM';
    }else if(user.id_role === 3){
      showMenu = 'Admin';
    }else if(user.id_role === 4){
      showMenu = 'FO';
    }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                </div> 
                 <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      {showMenu === 'Customer' && (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/editProfile"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Edit Profile
                            </a>
                          )}
                        </Menu.Item>
                      )}
                      {showMenu === 'SM'  && (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/editPassword"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Edit Password
                            </a>
                          )}
                        </Menu.Item>
                      )}
                        {showMenu === 'Admin'  && (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/editPassword"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Edit Password
                            </a>
                          )}
                        </Menu.Item>
                      )}                            
                          
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Edit Password
                          </a>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={handleLogout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Log Out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
