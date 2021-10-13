export const state = () => ({
    classes: [],
    students: []
})

export const mutations = {
    async setClasses(state, data) {
        state.classes = data
    },
    async setStudents(state, data) {
        state.students = data
    }
}

export const actions = {
    async getClasses({commit}) {
        const data = await this.$axios.$get('/classes')
        commit('setClasses', data)
    },
    async getStudents({commit}, sClass) {
        let data
        if(sClass == '')
            data = await this.$axios.$get('/students')
        else
            data = await this.$axios.$get(`/students?sClass=${sClass}`)
        commit('setStudents', data)
    },
    async createStudent(context, student) {
        this.$axios.setHeader('Authorization', this.$auth.strategy.token.get())
        await this.$axios.post('/students', student)
    },
    async updateStudent(context, data) {
        const sClass = data.sClass._id //Because we must be sent id to API
        const id = data._id
        const { name, point } = data

        this.$axios.setHeader('Authorization', this.$auth.strategy.token.get())
        await this.$axios.patch('/students', {id, name, sClass, point})
    },
    async deleteStudent(context, id) {
        this.$axios.setHeader('Authorization', this.$auth.strategy.token.get())
        await this.$axios.delete(`/students/${id}`)
    },
    async createClass(context, sClass) {
        this.$axios.setHeader('Authorization', this.$auth.strategy.token.get())
        await this.$axios.post('/classes', sClass)
    },
    async updateClass(context, data) {
        const id = data._id
        const { name } = data

        this.$axios.setHeader('Authorization', this.$auth.strategy.token.get())
        await this.$axios.patch('/classes', {id, name})
    },
    async deleteClass(context, id) {
        this.$axios.setHeader('Authorization', this.$auth.strategy.token.get())
        await this.$axios.delete(`/classes/${id}`)
    },
    async updateAdmin(context, data) {
        if(data.password == '') data.password = 'admin123'
        const { id, username, password } = data

        this.$axios.setHeader('Authorization', this.$auth.strategy.token.get())
        await this.$axios.patch('/admins', {id, username, password})
    }
}