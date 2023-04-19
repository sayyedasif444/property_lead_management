const userNavTree = [];
const componentsNavTree = [];
var nav = [...componentsNavTree];

if (sessionStorage.getItem('role') === 'USER') {
  nav = userNavTree;
}

const navigationConfig = [...nav];

export default navigationConfig;
