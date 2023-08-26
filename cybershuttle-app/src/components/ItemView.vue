<template>
    <div class="primary-wrapper">
        <v-container class="bg-surface-variant">
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-left">
                            Description
                        </th>
                        <th class="text-left">
                            Status
                        </th>
                        <th class="text-left">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="userItem in userItems" :key="userItem.name">
                        <td>{{ userItem.name }}</td>
                        <td>{{ userItem.description }}</td>
                        <td>{{ userItem.itemStatus }}</td>
                        <td>
                            <v-btn variant="tonal" color="red" v-if="userItem.isItemLaunched"
                                @click="(e) => handleItemAction(userItem, e)">Stop</v-btn>
                            <v-btn variant="tonal" color="green" v-else
                                @click="(e) => handleItemAction(userItem, e)">Launch</v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-container>


    </div>
</template>

<script>

import { inject } from 'vue';
import { useUsersStore } from "../stores/users";

export default {

    name: "ItemView",

    data() {
        return {
            userItems: null,
            sessionPath: null
        }
    },

    setup() {
        const CyberShuttleService = inject("CyberShuttleServiceKey");
        return { CyberShuttleService }
    },

    async mounted() {
        const userStore = useUsersStore();
        const appId = userStore.getAppid;
        this.sessionPath = userStore.getConsulPath;
        const data = {
            appId: appId
        }
        try {
            const res = await this.CyberShuttleService.getItems(data);
            this.userItems = res.userItems;
        } catch (err) {
            console.log(err);
        }
    },

    methods: {
        async handleItemAction(userItem, e) {
            e.preventDefault();
            var res;
            const data = {
                itemId: userItem.itemId,
                sessionPath: this.sessionPath
            }
            if (!userItem.isItemLaunched) {
                res = await this.CyberShuttleService.launchItem(data)
            } else {
                res = await this.CyberShuttleService.stopItem(data)
            }
            userItem.isItemLaunched = res.isItemLaunched;
            userItem.itemStatus = res.itemStatus;
        }
    }
}

</script>