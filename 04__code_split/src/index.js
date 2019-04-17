//// -------------- 按需加载/懒加载
import _ from 'lodash'

function component() {
  let element = document.createElement('div')

  var button = document.createElement('button');
  var br = document.createElement('br');
  button.innerHTML = 'Click me and look at the console!';
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(br);
  element.appendChild(button);
  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    var print = module.default
    print()
  })

  return element
}

document.body.appendChild(component())

//// ------------- 动态导入(dynamic imports)

// async function getComponent() {
//   var element = document.createElement('div');
//   const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');

//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//   return element;
// }
  
// // getComponent().then(component => {
// //   document.body.appendChild(component);
// // });
// // or
// async function doit() {
//   let component = await getComponent()
//   document.body.appendChild(component)
// }
// doit()


//// --------------- 预取/预加载模块(prefetch/preload module) 