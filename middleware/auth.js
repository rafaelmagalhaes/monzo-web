export default (ctx) => {
  if (!localStorage.getItem('token')) {
    alert('Please login');
    return ctx.redirect('/')
  }
}

function isAuth() {
  return false
}
