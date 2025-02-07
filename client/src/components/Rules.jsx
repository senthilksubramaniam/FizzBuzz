export default function Rules({rules})
{
    return <table id="rules">
        <thead>
            <tr>
            <th>DIVISIBLE BY</th>
            <th>REPLACEMENT</th>
            <th>SCORE</th>
            </tr>
        </thead>
        <tbody>
            {rules.map(rule=>{
               return <tr key={rule.divisibleBy}>
                    <td>{rule.divisibleBy}</td>
                    <td>{rule.replacement}</td>
                    <td>{rule.score}</td>
                </tr>
            } )}
        </tbody>
    </table>
}