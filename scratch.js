const { bcrypt } = require('./routes/utils')

// async function hasher(password) {
//     const hashed = await bcrypt.hash(password, 10);
//     console.log(hashed)
// }

// console.log(hasher("Testing123!"))
// console.log(hasher("musicRocks!00"))
// console.log(hasher("Mod4isgreat!"))
// console.log(hasher("Password9!"))
// console.log(hasher("Password21@"))
// console.log(hasher("Unicorns567$"))

// hasher('Demo123!')

// '$2a$10$NLJle3Sb4bavbGoHb7xexeQhumUbRj84gsPWNx61laMcgQ9HGapxK'
// '$2a$10$xlkfGhmVG2b/O14J4qxtKeSPg82OekYtll30ktLpa9vJy3.RJF.dG'
// '$2a$10$D6BTUlLDaPGKA.R1zlBaAO9yhalM4JpRBzdq.9IWt0oL6UlzdCNam'
// '$2a$10$4aQ3NopkhWTMWXVTbZIJ..hG1lTP8AQjhEh5HMLhZ2xjj85sU82Ym'
// '$2a$10$4Wb3LYLwxtyjMUxphH6RbehrSU8zDeq4NlMsrhl/.nABFoP0/JUzO'
// '$2a$10$ZACZbuty.hEmS9EuLlJliezYjqlPbYWFBSMCu9lilrr7C28IWFSDm'

'$2a$10$qQh0oPXvYaRMgpAUZr86o.AreddePYKbgUEW.DJbbOjY537rNMbQi'

async function hashcompare(password, hashed) {
    const check = await bcrypt.compare(password, hashed)
    console.log(check)
}

// hashcompare('Testing123!', '$2a$10$NLJle3Sb4bavbGoHb7xexeQhumUbRj84gsPWNx61laMcgQ9HGapxK')

hashcompare('Demo123!', '$2a$10$qQh0oPXvYaRMgpAUZr86o.AreddePYKbgUEW.DJbbOjY537rNMbQi')
