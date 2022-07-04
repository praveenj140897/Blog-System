const intitalBlogs = [
    {
        "id": 1,
        "title": "Python",
        "content": "<p>Python&nbsp;is a&nbsp;high-level,&nbsp;interpreted,&nbsp;general-purpose programming language. Its design philosophy emphasizes&nbsp;code readability&nbsp;with the use of&nbsp;significant indentation.[32] Python is&nbsp;dynamically-typed&nbsp;and&nbsp;garbage-collected. It supports multiple&nbsp;programming paradigms, including&nbsp;structured&nbsp;(particularly&nbsp;procedural),&nbsp;object-oriented&nbsp;and&nbsp;functional programming. It is often described as a \"batteries included\" language due to its comprehensive&nbsp;standard library.[33][34] Guido van Rossum&nbsp;began working on Python in the late 1980s as a successor to the&nbsp;ABC programming language&nbsp;and first released it in 1991 as Python&nbsp;0.9.0.[35]&nbsp;Python&nbsp;2.0 was released in 2000 and introduced new features such as&nbsp;list comprehensions,&nbsp;cycle-detecting&nbsp;garbage collection,&nbsp;reference counting, and&nbsp;Unicode&nbsp;support. Python&nbsp;3.0, released in 2008, was a major revision that is not completely&nbsp;backward-compatible&nbsp;with earlier versions. Python&nbsp;2 was discontinued with version&nbsp;2.7.18 in 2020.[36]</p>",
        "isUpdating": true,
        "highlightedWords": [
            "Python",
            "programming",
            "functional"
        ]
    },
    {
        "id": 2,
        "title": "JavaScript",
        "content": "<p>JavaScript&nbsp;(JS) is a lightweight, interpreted, or&nbsp;just-in-time&nbsp;compiled programming language with&nbsp;first-class functions. While it is most well-known as the scripting language for Web pages,&nbsp;many non-browser environments&nbsp;also use it, such as&nbsp;Node.js,&nbsp;Apache CouchDB&nbsp;and&nbsp;Adobe Acrobat. JavaScript is a&nbsp;prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.</p>",
        "isUpdating": true,
        "highlightedWords": [

        ]
    },
    {
        "id": 3,
        "title": "Vue JS",
        "content": "<p>Vue (pronounced /vjuː/, like&nbsp;view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS and JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex.</p>",
        "isUpdating": true,
        "highlightedWords": [
            "Vue",
            "JavaScript",
            "framework",
            "programming"
        ]
    }
]

if (JSON.parse(sessionStorage.getItem('blogs')) == null) {
    sessionStorage.setItem('blogs', JSON.stringify(intitalBlogs))
}

const state = {
    blogs: JSON.parse(sessionStorage.getItem('blogs')),
}

const getters = {
    getBlogs: (state) => (currentlyHighlitedWord) => currentlyHighlitedWord ? state.blogs.filter(blog => blog.highlightedWords.includes(currentlyHighlitedWord)) : state.blogs,
    getBlogById: (state) => (id) => state.blogs.find(blog => blog.id === id),
    getHighlitedWords: (state) => {
        let allHighlitedWords = [];
        state.blogs.forEach(blog => {
            blog.highlightedWords.forEach(highlightedWord => {
                if (!allHighlitedWords.includes(highlightedWord)) {
                    allHighlitedWords.push(highlightedWord);
                }
            })
        });
        return allHighlitedWords;
    }
}

const actions = {
    addEditBlog({ commit }, payload) {
        commit("addEditBlog", payload);
    },
    deleteBlog({ commit }, payload) {
        commit("deleteBlog", payload);
    }
}

const mutations = {
    addEditBlog(state, payload) {
        if (payload.isUpdating) {
            let blogIndex = state.blogs.findIndex(blog => blog.id === payload.id);
            if (blogIndex > -1) {
                state.blogs[blogIndex] = payload;
            }
        } else {
            state.blogs.push(payload);
        }
        sessionStorage.setItem('blogs', JSON.stringify(state.blogs))
    },
    deleteBlog(state, payload) {
        let blogIndex = state.blogs.findIndex(blog => blog.id === payload.id);
        if (blogIndex > -1) {
            state.blogs.splice(blogIndex, 1);
            sessionStorage.setItem('blogs', JSON.stringify(state.blogs))
        }
    }
}

export const blog = {
    state,
    getters,
    actions,
    mutations
}