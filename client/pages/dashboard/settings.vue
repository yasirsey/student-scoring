<template>
    <div>
        <Navbar />

        <form
            class="container mt-3 bg-white p-3 rounded shadow-lg"
            @submit.prevent="userLogin"
        >
            <div class="alert alert-warning" role="alert">
                <span class="fw-bold fs-5 text-center d-block">Dikkat!</span>
                <p>
                    <span class="fw-bold">-</span>
                    Kullanıcı adınızı ve şifrenizi değiştirirseniz eğer bunun geri dönüşü olmaz.
                    Lütfen unutmayacağınız bir kullanıcı adı ve şifre belirleyin ve
                    <span class="fw-bold">hibir yeri boş bırakmayın</span>. <br>
                    <span class="fw-bold">-</span>
                    Şifre alanını boş bıraktığınız takdirde şifreniz admin123 olacaktır.
                </p>
            </div>
            <div>
                <label>Kullanıcı Adınız: {{ username }}</label>
                <input
                    class="form-control"
                    type="text"
                    v-model="admin.username"
                />
            </div>
            <div>
                <label>Şifre</label>
                <input
                    class="form-control"
                    type="text"
                    v-model="admin.password"
                />
            </div>
            <div>
                <button class="btn btn-success w-100 mt-2" type="submit">
                    Güncelle
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    async mounted() {
        const admin = await this.$auth.fetchUser();
        this.admin.id = admin.data.user._id;
        this.username = admin.data.user.username;
    },
    data() {
        return {
            username: "",
            admin: {
                id: "",
                username: "",
                password: ""
            }
        };
    },
    methods: {
        async userLogin() {
            try {
                await this.$store.dispatch("updateAdmin", this.admin);
            } catch (err) {
                console.log(err);
            }
        }
    }
};
</script>
