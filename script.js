const { createApp } = Vue

createApp({
    data() {
        return {
            message: '',
            email: '',
            password: '',
            error: '',
            loading: false
        }
    },
    methods: {
        register() {
            this.loading = true
            fetch('http://studentsystem.xyz:8080/user', {
                method: "POST",
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            }).then((response) => {
                switch (response.status) {
                    case 201:
                        alert("ok")
                        break;
                    case 403:
                        this.error = 'Такой пользователь уже существует'
                        break;
                    case 400:
                        this.error = 'Не верные данные'
                        break;
                    default:
                        this.error = 'Неизвестный статус'
                        break;
                }
                return response.json();
            }).then((data) => {
                console.log(data)
                this.loading = false
                // alert('Вы успешно зарегистрировались')
                // location.href='/'
            }).catch((err) => {
                console.error("Невозможно отправить запрос", err);
            });
        },
        login() {
            this.loading = true
            fetch('http://studentsystem.xyz:8080/user/auth', {
                method: "POST",
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            }).then((response) => {
                switch (response.status) {
                    case 200:
                        this.error ='Вы авторизовались'

                    case 403:
                        this.error ='Не верный пароль'
                        break;
                    case 400:
                        this.error = 'Не верный пароль'
                        break;
                }
                return response.json();
            }).then((data) => {
                // location.href='/'
                if (data['access_token']) {
                    alert('Вы успешно вошли')
                    this.loading = false
                }
            }).catch((err) => {
                console.error("Невозможно отправить запрос", err);
            });
        }
    }
}).mount('#app')
