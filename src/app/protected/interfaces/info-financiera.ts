//********* SENTINEL INFORMACION FINANCIERA ****** */

/*export interface ISenInfoFinResponse {
    document_type:    string;
    document_number:  string;
    fullname:         string;
    birthday:         string;
    gender:           string;
    general_data:     GeneralData | any;
    financial_health: FinancialHealth[] | any;
    authorized_of:    AuthorizedOf[] | any;
    links:            Links[];
}*/

export interface ISenInfoFinResponse {
    birthday:         string;
    document_number:  string;
    gender:           string;
    financial_health: FinancialHealth | any;
    general_data:     GeneralData | any;
    fullname:         string;
    document_type:    string;
    links:            Links[];
}

/*export interface FinancialHealth {
    document_type:      string;
    document_number:    string;
    financial_summary:  FinancialSummary;
    debts_microfinance: DebtsMicrofinance[];
    debts_overdue:      DebtsOverdue[];
    other_credits:      DebtsOverdue[];
}*/
export interface FinancialHealth {
    document_number:    string;
    financial_summary:  FinancialSummary;
    debts_microfinance: DebtsMicrofinance[];
    debts_overdue:      DebtsOverdue[];
    credits:            Credit[];
    document_type:      string;
}

/*
export interface DebtsMicrofinance {
    name:            string;
    score:           string;
    total_debt:      number;
    debt_delay_days: number;
    processed_at:    string;
}*/
export interface DebtsMicrofinance {
    score:           string;
    total_debt:      number;
    debt_delay_days: number;
    name:            string;
    processed_at:    string;
}

/*
export interface DebtsOverdue {
    name:            string;
    score:           string;
    total_debt:      number;
    debt_delay_days: string;
}*/
export interface DebtsOverdue {
    score:           string;
    total_debt:      number;
    debt_delay_days: string;
    name:            string;
}

export interface Credit {
    bank_name:        string;
    total:            number;
    available:        number;
    usage:            number;
    usage_porcentage: number;
}
/*
export interface FinancialSummary {
    credit_score:             string;
    mark:                     string;
    score_current:            string;
    score_prev:               string;
    score_both:               string;
    processed_at:             Date;
    debts_total:              number;
    debts_microfinance_total: number;
    debts_overdue_total:      number;
    debts_others_total:       number;
    credits_total:            CreditsTotal;
}*/
export interface FinancialSummary {
    credit_score:             string;
    score_prev:               string;
    debts_microfinance_total: number;
    processed_at:             Date;
    score_current:            string;
    mark:                     string;
    score_both:               string;
    debts_overdue_total:      number;
    debts_total:              number;
    debts_others_total:       number;
    credits_total:            CreditsTotal;
}

/*
export interface GeneralData_ {
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
}*/
export interface GeneralData {
    ruc:             string;
    enrolled_at:     Date;
    address:         string;
    dependency:      string;
    ciuu:            string;
    asiento:         string;
    trade_name:      string;
    actived_at:      Date;
    carnet_code:     string;
    ruc_name:        string;
    trade_status:    string;
    folio:           string;
    trade_type:      string;
    trade_condition: string;
}

export interface AuthorizedOf {
    document_type: string;
    document_number: string;
    fullname:      string;
    score_current: string;
    score_prev:    string;
    score_both:    string;
    created_at:    string;
    charge:        string;
    status:        string;
}

export interface CreditsTotal {
    approved:         number;
    available:        number;
    usage:            number;
    usage_porcentage: number;
}


export interface Links {
    rel:    string;
    href:   string;
    data?:  Data;
}

export interface Data {
    created_at:      string;
    charge:          string;
    status:          string;
    document_number: string;
    document_type:   string;
}

//********* */


export interface BusquedaLinks {
    href:   string;
    procesado:   number;
    data:   Data;
}


//***** PARA LISTAS RESTRICTIVAS **** */

export interface IListRestrictive {
    notices: Restrictive[] | any;
    peps: Peps[] | any;
}
export interface Restrictive {
    type_id:                string;
    number_id:              string;
    name:                   string;
    coincidences:           string;
    coincidence_porcentage: number;
    alias:                  string;
    origen:                 string;
    type:                   string;
    update_at:              string;
    related_to:             string;
    related_id:             string;
    link:                   string;
    observations:           string;
    nationality:            string;
    consulted_at:           Date;
}

export interface Peps {
    type_id:                string;
    number_id:              string;
    name:                   string;
    coincidences:           string;
    coincidence_porcentage: number;
    origen:                 string;
    type:                   string;
    related_to:             string;
    related_id:             string;
    link:                   string;
    update_at:              string;
    named_id:               string;
    named_at:               string;
    retired_id:             string;
    retired_at:             string;
    last_care:              string;
    news:                   string;
    consulted_at:           string;
}
//********* */



//***** PARA SEMAFROS **** */
export interface ISemaforoRes {
    mes:    string;
    style:  string;
}
//********* */