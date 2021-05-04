import axios from "axios";

const GROUPS_URL = "http://localhost:8080/api/v1/groups";

class GroupService {
    getGroups() {
        return axios.get(GROUPS_URL);
    }

    getGroupById(groupId) {
        return axios.get(GROUPS_URL + '/' + groupId);
    }

    createGroup(group) {
        return axios.post(GROUPS_URL, group);
    }

    updateGroup(group, groupId) {
        return axios.put(GROUPS_URL + '/' + groupId, group);
    }

    deleteGroup(groupId) {
        return axios.delete(GROUPS_URL + '/' + groupId);
    }
}

export default new GroupService();