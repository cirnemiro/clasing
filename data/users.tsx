export const fetchUsers = async() => {
    const response = await fetch("https://randomuser.me/api/?results=100&seed=foobar");
    const users = await response.json();
    return users
}