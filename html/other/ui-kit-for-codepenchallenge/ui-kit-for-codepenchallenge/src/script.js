new Vue({
    el: '#app',
    data() {
        return {
            colors: {
                '--primary-1': '#F44336',
                '--primary-2': '#1E88E5',
                '--primary-3': '#FDD835',
                '--border': '#CDD9ED',
                '--border-hover': '#99A3BA',
                '--text-color': '#6C7486',
                '--text-color-headline': '#3F4656'
            },
            codepenChallange: ['#F44336', '#1E88E5', '#FDD835'],
            examples: ['#5628EE', '#8C6FF0', '#23C4F8', '#D93757', '#3FDC75', '#F6D87C'],
            examplesToggle: {
                first: false,
                second: false,
                third: false
            }
        }
    },
    methods: {
        cssVar(name, value) {
            document.documentElement.style.setProperty(name, value)
        },
        setColor(color, name) {
            this.colors[name] = color;
        }
    },
    watch: {
        colors: {
            handler(val) {
                for(var key in val) {
                    if(val.hasOwnProperty(key) && /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val[key])) {
                        this.cssVar(key, val[key])
                    }
                }
            },
            deep: true
        }
    }
})

eva.replace()
