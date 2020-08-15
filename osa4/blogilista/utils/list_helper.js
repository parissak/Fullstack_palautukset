const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce(function (prev, cur) {
    return prev + cur.likes
  }, 0)
  return sum
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce(function (prev, cur) {
    return prev.likes > cur.likes ? prev : cur
  })
  return favorite
}

const mostBlogs = (blogs) => {
  let map = new Map()

  for (let index = 0; index < blogs.length; index++) {
    let name = blogs[index].author
    if (map.has(name)) {
      map.set(name, map.get(name) + 1)
    } else {
      map.set(name, 1)
    }
  }

  const max = [...map.entries()].reduce((a, e) => e[1] > a[1] ? e : a)
  const retObject = { author: max[0], blogs: max[1] }

  return retObject
}

const mostLikes = (blogs) => {
  let map = new Map()

  for (let index = 0; index < blogs.length; index++) {
    let name = blogs[index].author
    let likes = blogs[index].likes
    if (map.has(name)) {
      map.set(name, map.get(name) + likes)
    } else {
      map.set(name, likes)
    }
  }

  const max = [...map.entries()].reduce((a, e) => e[1] > a[1] ? e : a)
  const retObject = { author: max[0], likes: max[1] }

  return retObject
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}