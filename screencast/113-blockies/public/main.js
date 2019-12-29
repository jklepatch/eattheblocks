//with es6: import { create } from 'blockies';

const address = [
  '0x554f8e6938004575bd89cbef417aea5c18140d92',
  '0xcc6294200fa6e6eb5c3034ed6b0b80401f5b0ceb',
  '0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359'
];

const addressIcons = address.map((address, i) => ({
  text: document.createTextNode(`Address ${i + 1}: ${address}`),
  icon: blockies.create({
    seed: address, 
    size: 10,
    scale: 10
  })
}));


window.addEventListener('load', () => {
  addressIcons.forEach(address => {
    const wrapper = document.createElement('div');
    wrapper.appendChild(address.text);
    wrapper.appendChild(address.icon);
    document.body.appendChild(wrapper);
  });
});
