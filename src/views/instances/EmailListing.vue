<template>
    <div class="mt-16 mx-10">


        <v-card elevation="0">

            <v-simple-table dense>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Email Name</th>
                            <th class="text-left">Published</th>
                            <th class="text-left">Read Count</th>

                            <th class="text-left">Sent Count</th>

                            <th class="text-left">Created By</th>
                            <th class="text-left">Created At</th>
                            <th class="text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in emails" :key="item.id">
                            <td>{{ item.name }}</td>

                            <td>
                                <v-icon color="blue darken-2" v-if="item.isPublished">mdi-check</v-icon>
                            </td>
                            <td>{{ item.readCount }}</td>
                            <td>{{ item.sentCount }}</td>
                            <td>{{ item.createdByUser }}</td>
                            <td>
                                {{ moment(item.dateAdded).format("MM-DD-YYYY") }}
                            </td>
                            <td>
                                <v-icon small class="mr-2" @click="openEmailDialog(item)">
                                    mdi-pencil
                                </v-icon>
                                <v-icon small class="mr-2"> mdi-delete </v-icon>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <v-progress-circular v-if="isLoading" style="position: relative; left: 50%;" :size="64" :width="7"
                color="primary" indeterminate></v-progress-circular>
            <!-- <Pagination :count="count" :pagination="pagination" @pageChangedEvent="pagination.page = $event" /> -->
        </v-card>





    </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Pagination from "@/components/Pagination.vue";


export default {
    components: { Pagination },
    props: ['instanceDetails'],
    data() {
        return {
            emails: [],
            isLoading: false,
            moment: moment,
            pagination: {
                page: 1,
                itemPerPage: 10,
            },
            count: 0,
            headers: [
                { text: "Email Name", value: "name", width: "150px" },
                { text: "Published", value: "isPublished", width: "150px" },
                { text: "Read Count", value: "readCount", width: "170px" },
                { text: "Sent Count", value: "phone", width: "150px" },

                { text: "Created By", value: "aov" },
                { text: "Created At", value: "repeated" },
                {
                    text: "Actions",
                    align: "start",
                    value: "actions",
                    width: "150px",
                },
            ],
        }
    },
    methods: {
        listEmails() {
            this.isLoading = true
            console.log("req body ====>", this.instanceDetails);
            const payload = {
                id: this.instanceDetails._id
            }
            axios
                .post(`${process.env.VUE_APP_API_URL}api/list-emails?limit=3&search=sdfasdf`, payload, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    console.log(res);
                    this.emails = res.data.emails;
                    this.isLoading = false
                    this.count = res.data.total
                    console.log(this.emails)
                });
        },
    },
    mounted() {
        this.listEmails()
    }
}
</script>

<style></style>