export interface ISenInfoFinResponse {
    document_type:    string;
    document_number:  string;
    fullname:         string;
    birthday:         string;
    gender:           string;
    general_data:     GeneralData | any;
    financial_health: FinancialHealth[] | any;
}

export interface FinancialHealth {
    document_type:      string;
    document_number:    string;
    financial_summary:  FinancialSummary;
    debts_microfinance: DebtsMicrofinance[];
    debts_overdue:      DebtsOverdue[];
    other_credits:      DebtsOverdue[];
}

export interface DebtsMicrofinance {
    name:            string;
    score:           string;
    total_debt:      number;
    debt_delay_days: number;
    processed_at:    string;
}

export interface DebtsOverdue {
    name:            string;
    score:           string;
    total_debt:      number;
    debt_delay_days: string;
}

export interface FinancialSummary {
    credit_score:             string;
    mark:                     string;
    score_current:            string;
    score_prev:               string;
    score_both:               string[];
    processed_at:             Date;
    debts_total:              number;
    debts_microfinance_total: number;
    debts_overdue_total:      number;
    debts_others_total:       number;
}

export interface GeneralData {
    ruc:             string;
    ruc_name:        string;
    trade_name:      string;
    trade_type:      string;
    trade_status:    string;
    trade_condition: string;
    dependency:      string;
    ciuu:            string;
    actived_at:      Date;
    enrolled_at:     Date;
    carnet_code:     string;
    folio:           string;
    asiento:         string;
    address:         string;
}


export interface ISemaforoRes {
    mes:    string;
    style:  string;
}