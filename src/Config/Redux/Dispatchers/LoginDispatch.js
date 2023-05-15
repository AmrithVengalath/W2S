export default function LoginDispatch(token,name,email,password) {
  return {
    type: 'EDIT_USER_FIELDS',
    payload: {
      token: token,
      name: name,
      email: email,
      password:password
    },
  };
}
