// gives search data and number to display and page 
export const getParams = () => {
    const elements = Array.from(document.querySelectorAll('[data-input]'));

    const searchResult = elements[0]?.value.trim() || ''
    const heroesCount = parseInt(elements[1].value) || data.length
    const pageNumber = parseInt(elements[2]?.value) || 1

    return { searchResult, heroesCount, pageNumber }
}

export const averagePowerStats = (stats) => {
    const values = Object.values(stats).filter(value => typeof value === 'number')
    return values.length ? values.reduce((sum, val) => sum + val, 0) / values.length : 0
}