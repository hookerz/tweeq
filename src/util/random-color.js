const { floor, random } = Math;
const colors = [ 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'magenta' ];

export default function() {

  return colors[floor(random() * colors.length)];

}