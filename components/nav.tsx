import ActiveLink from './ActiveLink'
const navigationPayroll = [
  {
    'name': "Map",
    'url': "/"
  },
  {
    'name': "List",
    'url': "https://docs.google.com/spreadsheets/d/197-LIu3K9lBEFU8DD0uEmaQnbJUiTpCH9itwMA1aCs0/edit?usp=sharing"
  }
]

function Nav() {
  return <div className="bg-[#1a1a1a] flex flex-col">
    <nav className="flex flex-row  h-content">
      {navigationPayroll.map((item, itemIdx) =>
                     
              
                     <ActiveLink activeClassName="text-gray-100 py-3 px-6 block hover:text-green-300 focus:outline-none text-green-300 border-b-2 font-medium border-green-300" href={item.url}
                     key={itemIdx}
                     >
                     <a className="text-gray-100 py-3 px-6 block hover:text-green-300 focus:outline-none">
                                                 {item.name}
                     </a>
                     </ActiveLink>
                     
                   )}
  </nav></div>
}

export default Nav