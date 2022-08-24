const Settings = {
    apiUrl: 'http://localhost:2227/api/',
    assetUrl: 'http://localhost:2227/api/products/image/',
    token: '',
    user: {},
    setToken: (token) => {
        Settings.token = token;
    }
}

export default Settings;