import Papa from 'papaparse';

export interface ColumnConfig<T> {
    header: string;
    accessor: (item: T) => string | number | null | undefined;
}

/**
 * Export data to CSV file
 * @param data - Array of data to export
 * @param filename - Name of the downloaded file
 * @param columns - Column configuration for headers and data mapping
 */
export function exportToCSV<T>(
    data: T[],
    filename: string,
    columns: ColumnConfig<T>[]
): void {
    if (data.length === 0) {
        alert('No data to export');
        return;
    }

    // Transform data based on column configuration
    const transformedData = data.map(item => {
        const row: Record<string, string | number | null | undefined> = {};
        columns.forEach(col => {
            row[col.header] = col.accessor(item);
        });
        return row;
    });

    // Generate CSV
    const csv = Papa.unparse(transformedData, {
        quotes: true,
        header: true
    });

    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

/**
 * Format date for CSV export
 */
export function formatDateForCSV(date: string | Date | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
