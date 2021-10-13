<template>
    <div>
        <Navbar />

        <main class="container">
            <select
                @change="onChangeClass($event)"
                class="form-select mt-3"
                aria-label="class"
            >
                <option value="" selected>Tümü</option>
                <option
                    :value="item._id"
                    v-for="item in classes"
                    :key="item.id"
                    >{{ item.name }}</option
                >
            </select>

            <table class="table mt-2 table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ad Soyad</th>
                        <th scope="col">Sınıf</th>
                        <th scope="col">Puan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Yeni</th>
                        <td>
                            <input
                                type="text"
                                class="form-control"
                                v-model="newStudent.name"
                            />
                        </td>
                        <td>
                            <select v-model="newStudent.sClass" class="form-select" aria-label="class">
                                <option selected>Seç</option>
                                <option
                                    :value="item._id"
                                    v-for="item in classes"
                                    :key="item._id"
                                    >{{ item.name }}</option
                                >
                            </select>
                        </td>
                        <td>
                            <input
                                type="text"
                                class="form-control"
                                v-model="newStudent.point"
                            />
                        </td>
                        <td>
                            <button @click="createStudent" class="btn btn-success">Ekle</button>
                        </td>
                    </tr>
                    <tr v-for="(student, index) in sortedStudents" :key="student.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>
                            <input
                                type="text"
                                class="form-control"
                                v-model="student.name"
                            />
                        </td>
                        <td>
                            <select v-model="student.sClass._id" class="form-select" aria-label="class">
                                <option selected>Değiştir</option>
                                <option
                                    :value="item._id"
                                    v-for="item in classes"
                                    :key="item._id"
                                    >{{ item.name }}</option
                                >
                            </select>
                        </td>
                        <td>
                            <input
                                type="text"
                                class="form-control"
                                v-model="student.point"
                            />
                        </td>
                        <td>
                            <button @click="updateStudent(student)" class="btn btn-warning">Güncelle</button>
                            <button @click="deleteStudent(student)" class="btn btn-danger">Sil</button>
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
        this.getStudents();
    },
    data: () => ({
        selectedClass: "",
        students: [],
        newStudent: {
            name: '',
            sClass: 'Seç',
            point: 0
        }
    }),
    methods: {
        onChangeClass(event) {
            this.selectedClass = event.target.value;
            this.getStudents();
        },
        updateStudent(student) {
            this.$store.dispatch("updateStudent", student);
            this.getStudents();
        },
        async deleteStudent(student) {
            await this.$store.dispatch("deleteStudent", student._id);
            this.getStudents();
        },
        async createStudent() {
            await this.$store.dispatch("createStudent", this.newStudent);
            this.getStudents();
        },
        async getStudents() {
            if (this.selectedClass == "") this.students = await this.$axios.$get("/students");
            else this.students = await this.$axios.$get(`/students?sClass=${this.selectedClass}`);
        }
    },
    computed: {
        classes() {
            return this.$store.state.classes;
        },
        sortedStudents() {
            return this.students.sort((a, b) => b.point - a.point)
        }
    }
};
</script>
