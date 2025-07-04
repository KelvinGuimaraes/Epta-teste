interface VetabelaProps<T extends object> {
    data: Array<T>;
    columns: Array<{ key: keyof T; label: string }>;
}

const Vetabela = <T extends object>({ data, columns }: VetabelaProps<T>) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={String(col.key)}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <tr key={idx}>
                        {columns.map(col => (
                            <td key={String(col.key)}>{String(row[col.key])}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Vetabela;