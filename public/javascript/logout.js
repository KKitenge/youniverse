async function logout() {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (err) {
    console.log(err);
    alert('Failed to logout.');
  }
}

document.querySelector('#logout').addEventListener('click', logout);