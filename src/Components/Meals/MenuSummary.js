import classes from './MenuSummary.module.css'

const MenuSummary= () => {
    return (
        <section className={classes.summary}>
            <h2>Food Menu</h2>
            <p>Choose items from the list below, this is an artisan curation of top tier meals</p>
            <p>Everything in here is handcrafted by the finest craftsmen.</p>
        </section>
    )
}

export default MenuSummary;