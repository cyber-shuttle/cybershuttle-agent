<template>
    <div class="primary-wrapper">

        <v-container class="bg-surface-variant">
            <v-row no-gutters>
                <template v-for="userApp in userApps">
                    <v-col @click="(e) => handleGetItems(userApp, e)">
                        <!-- <v-col> -->
                        <div class="mt-2 d-flex align-center flex-column">

                            <v-card width="400">
                                <v-card-item>
                                    <v-card-title>This is {{ userApp.name }}</v-card-title>

                                    <v-card-subtitle>It takes {{ userApp.icon }} as background</v-card-subtitle>
                                </v-card-item>

                                <v-card-text>
                                    App id is {{ userApp.appId }} and it has {{ userApp.noOfItems }} items.
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-col>
                    <v-responsive v-if="userApp.appId === 1" width="100%"></v-responsive>
                </template>

            </v-row>
        </v-container>



    </div>
</template>

<script>

import { inject } from 'vue';
import { useUsersStore } from "../stores/users";

export default {

    name: "AppView",

    data() {
        return {
            userApps: null
        }
    },

    setup() {
        const CyberShuttleService = inject("CyberShuttleServiceKey");
        return { CyberShuttleService }
    },

    async mounted() {
        const userStore = useUsersStore();
        const data = {
            userId: userStore.getUserid
        }
        try {
            const res = await this.CyberShuttleService.getApps(data);
            this.userApps = res.userApps;
        } catch (err) {
            console.log(err);
        }
    },

    methods: {
        async handleGetItems(userApp, e) {
            e.preventDefault();
            const userStore = useUsersStore();
            userStore.setAppid(userApp.appId);
            this.$router.push("/myitems");
        }
    }
}

</script>