<template>
    <div>
        <Navbar />

        <main class="container">
            <table class="table mt-2 table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Adı</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Yeni</th>
                        <td>
                            <input
                                type="text"
                                class="form-control"
                                v-model="newClass.name"
                            />
                        </td>
                        <td>
                            <button @click="createClass" class="btn btn-success">Ekle</button>
                        </td>
                    </tr>
                    <tr v-for="(sClass, index) in sortedClasses" :key="sClass.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>
                            <input
                                type="text"
                                class="form-control"
                                v-model="sClass.name"
                            />
                        </td>
                        <td>
                            <button @click="updateClass(sClass)" class="btn btn-warning">Güncelle</button>
                            <button @click="deleteClass(sClass)" class="btn btn-danger">Sil</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    </div>
</template>

<script>
import _ from "lodash";

export default {
    mounted() {
        this.$store.dispatch("getClasses");
        //I don't use store because we can't use v-model if we're use store
        this.getClasses();
    },
    data: () => ({
        classes: [],
        newClass: {
            name: ''
        }
    }),
    methods: {
        updateClass(sClass) {
            this.$store.dispatch("updateClass", sClass);
            this.getClasses();
        },
         async deleteClass(sClass) {
            await this.$store.dispatch("deleteClass", sClass._id);
            this.getClasses();
        },
        async createClass() {
            await this.$store.dispatch("createClass", this.newClass);
            this.getClasses();
        },
        async getClasses() {
            this.classes = await this.$axios.$get('/classes')
        }
    },
    computed: {
        sortedClasses() {
            return this.classes.sort((a, b) => b.point - a.point)
        }
    }
};
</script>
