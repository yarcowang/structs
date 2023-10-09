import * as ini from './ini.mjs'

const doc = document
const URL = {'types': './_types', 'components': './_components', 'structs': './_structs'}
const process = (t, v, cb) => {
    const url = `${URL[t]}/${v}.ini`
    axios.get(url).then(r => {
        cb(ini.decode(r.data))
    }).catch(e => {
        cb(null, e)
    })
}
const loadIdx = (t, cb) => {
    const url = `${URL[t]}/index.json`
    axios.get(url).then(r => {
        cb(r.data)
    }).catch(e => {
        cb(null, e)
    })
}

Array.from(doc.getElementsByClassName('tps')).forEach(item => {
    const name = item.dataset.name

    item.addEventListener('mouseover', () => {
        const el = item.querySelector(`span#types_${name}`)
        if (!el) {
            process('types', name, (v, e) => {
                let s = doc.createElement('span')
                s.id = `types_${name}`
                s.innerHTML = `${v.title}, ${v.description}`
                s.className = 'info'

                item.appendChild(s)
            })
        }
    })
})

doc.addEventListener('DOMContentLoaded', () => {
    loadIdx('components', (v, e) => {
        const c = document.getElementById('c')

        v.forEach(i => {
            let li = doc.createElement('li')
            li.innerHTML = `<a href="#" class="cps" data-name="${i}">${i}</a>`
            c.appendChild(li)
        })
    })

    loadIdx('structs', (v, e) => {
        const c = document.getElementById('s')

        v.forEach(i => {
            let li = doc.createElement('li')
            li.innerHTML = `<a href="#" class="sts" data-name="${i}">${i}</a>`
            c.appendChild(li)
        })
    })
})
