class AppStorage {
  storeCurrentUser(currentUser) {
    if (process.browser) {
      localStorage.setItem('currentUser', currentUser);
    }
  }

  storeAccessToken(data) {
    if (process.browser) {
      localStorage.setItem('access_token', data);
    }
  }

  clearLocalStorage() {
    if (process.browser) {
      localStorage.clear();
    }
  }
}

// eslint-disable-next-line no-class-assign
export default AppStorage = new AppStorage();
